import abi from '../abis/src/contracts/Auction.sol/Auction.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'
// import { Web3Modal } from "web3modal";
import { checkAuthState, logOutWithCometChat } from './chat'

const { ethereum } = window
const ContractAddress = address.address
const ContractAbi = abi.abi
let tx
const RPC_AAH = "https://rpc.c4ex.net"
// const toWei = (num) => ethers.utils.parseEther(num.toString())
const toWei = (num) => ethers.utils.parseEther(num).toString()
const fromWei = (num) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    // const provider = new ethers.providers.Web3Provider(ethereum)
    // const provider = new ethers.providers.Web3Provider(RPC_AAH)
    const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : new ethers.providers.Web3Provider(RPC_AAH));
    const _chainId = Number(await ethereum.request({ method: "eth_chainId" }))
    if (_chainId!=21133) {
      alert('Please change Network AAH current : '+_chainId)
      return 
    }

    const signer = provider.getSigner()
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
    return contract
  } else {
    return getGlobalState('contract')
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask-40')

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    const _chainId = Number(await ethereum.request({ method: "eth_chainId" }))
    if (_chainId!=21133) {
      alert('Please change Network AAH current : '+_chainId)
      return
    }

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      setGlobalState('connectedChainId', _chainId)
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      setGlobalState('connectedChainId', _chainId)
      await isWallectConnected()
      await loadCollections()
      await logOutWithCometChat()
      await checkAuthState()
        .then((user) => setGlobalState('currentUser', user))
        .catch((error) => setGlobalState('currentUser', null))
    })


  } catch (error) {
    alert('Please install Metamask')
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask-81')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const createNftItem = async ({
  name,
  description,
  image,
  metadataURI,
  price,
}) => {
  try {
    // alert('115 blockchain.jsx - createNftItem\n' +name+':name\n'+description+':description\n'+image+':image\n'+metadataURI+':metadataURI\n'+price+':price\n');
    if (!ethereum) { return alert('Please install Metamask-98') }

    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    // alert(contract.address+" : contract-119 ln");
    // tx = await contract.createAuction( name,description,image,metadataURI,toWei(price),{from: connectedAccount,value: toWei(0.8),}, )
    // await tx.wait()
    const transaction = await contract.createAuction( 
      name,
      description,
      image,
      metadataURI,
      toWei(price),
      {
        from: connectedAccount,
        value: "800000000000000000", //toWei(0.8)
      }, 
    )
    await transaction.wait();
    closeModal()
    // alert("116 : tx.wait()");
    await loadAuctions()
  } catch (error) {
    reportError(error)
  }
}

const closeModal = () => {
  setGlobalState('boxModal', 'scale-0')
  // resetForm()
}

const updatePrice = async ({ tokenId, price }) => {
  try {
    if (!ethereum) return alert('Please install Metamask-132')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    tx = await contract.changePrice(tokenId, toWei(price), {
      from: connectedAccount,
    })
    await tx.wait()
    await loadAuctions()
  } catch (error) {
    reportError(error)
  }
}

const offerItemOnMarket = async ({
  tokenId,
  biddable,
  sec,
  min,
  hour,
  day,
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask-154')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    tx = await contract.offerAuction(tokenId, biddable, sec, min, hour, day, {
      from: connectedAccount,
    })
    await tx.wait()
    await loadAuctions()
  } catch (error) {
    reportError(error)
  }
}

const buyNFTItem = async ({ tokenId, price }) => {
  try {
    if (!ethereum) return alert('Please install Metamask-169')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    tx = await contract.buyAuctionedItem(tokenId, {
      from: connectedAccount,
      value: toWei(price),
    })
    await tx.wait()
    await loadAuctions()
    await loadAuction(tokenId)
  } catch (error) {
    reportError(error)
  }
}

const bidOnNFT = async ({ tokenId, price }) => {
  try {
    if (!ethereum) return alert('Please install Metamask-186')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    tx = await contract.placeBid(tokenId, {
      from: connectedAccount,
      value: toWei(price),
    })

    await tx.wait()
    await getBidders(tokenId)
    await loadAuction(tokenId)
  } catch (error) {
    reportError(error)
  }
}

const claimPrize = async ({ tokenId, id }) => {
  try {
    if (!ethereum) return alert('Please install Metamask-204')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    tx = await contract.claimPrize(tokenId, id, {
      from: connectedAccount,
    })
    await tx.wait()
    await getBidders(tokenId)
  } catch (error) {
    reportError(error)
  }
}

const loadAuctions = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask-219')
    const contract = await getEthereumContract()
    const auctions = await contract.getLiveAuctions()
    setGlobalState('auctions', structuredAuctions(auctions))
    setGlobalState('auction',structuredAuctions(auctions).sort(() => 0.5 - Math.random())[0],)
  } catch (error) {
    reportError(error)
    // const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : new ethers.providers.Web3Provider(RPC_C4EI));
    // const signer = provider.getSigner()
    // const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
    // const auctions = await contract.getLiveAuctions()
    // setGlobalState('auctions', structuredAuctions(auctions))
    // setGlobalState('auction',structuredAuctions(auctions).sort(() => 0.5 - Math.random())[0],)
  }
}

const loadAuction = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask-237')
    const contract = await getEthereumContract()
    const auction = await contract.getAuction(id)
    setGlobalState('auction', structuredAuctions([auction])[0])
  } catch (error) {
    reportError(error)
  }
}

const getBidders = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask-248')
    const contract = await getEthereumContract()
    const bidders = await contract.getBidders(id)
    setGlobalState('bidders', structuredBidders(bidders))
  } catch (error) {
    reportError(error)
  }
}

const loadCollections = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask-259')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    const collections = await contract.getMyAuctions({ from: connectedAccount })
    setGlobalState('collections', structuredAuctions(collections))
  } catch (error) {
    reportError(error)
  }
}

const structuredAuctions = (auctions) =>
  auctions
    .map((auction) => ({
      tokenId: auction.tokenId.toNumber(),
      owner: auction.owner.toLowerCase(),
      seller: auction.seller.toLowerCase(),
      winner: auction.winner.toLowerCase(),
      name: auction.name,
      description: auction.description,
      duration: Number(auction.duration + '000'),
      image: auction.image,
      price: fromWei(auction.price),
      biddable: auction.biddable,
      sold: auction.sold,
      live: auction.live,
    }))
    .reverse()

const structuredBidders = (bidders) =>
  bidders
    .map((bidder) => ({
      timestamp: Number(bidder.timestamp + '000'),
      bidder: bidder.bidder.toLowerCase(),
      price: fromWei(bidder.price),
      refunded: bidder.refunded,
      won: bidder.won,
    }))
    .sort((a, b) => b.price - a.price)

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export {
  isWallectConnected,
  connectWallet,
  createNftItem,
  loadAuctions,
  loadAuction,
  loadCollections,
  offerItemOnMarket,
  buyNFTItem,
  bidOnNFT,
  getBidders,
  claimPrize,
  updatePrice,
}
