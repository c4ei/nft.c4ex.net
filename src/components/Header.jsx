import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

import { ThirdwebProvider, ChainId, ConnectButton, } from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet, } from "thirdweb/wallets";
// import { useSwitchChain } from "@thirdweb-dev/react";
import { createThirdwebClient } from "thirdweb";
import { AllAboutHealthy } from "@thirdweb-dev/chains";
const activeChain = AllAboutHealthy;
// const switchChain = useSwitchChain();
const client = createThirdwebClient({  clientId: process.env.REACT_APP_TEMPLATE_CLIENT_ID,});
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
];

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [connectedChainId] = useGlobalState('connectedChainId')
  return (
    <nav className="w-4/5 flex flex-row md:justify-center justify-between items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="text-white">
          <span className="px-2 py-1 font-bold text-3xl italic">AAH</span>
          <span className="py-1 font-semibold italic">NFT Auction</span>
        </Link>
      </div>

      <ul
        className="md:flex-[0.5] text-white md:flex
      hidden list-none flex-row justify-between 
      items-center flex-initial"
      >
        <Link to="/" className="mx-4 cursor-pointer">Market</Link>
        <Link to="/collections" className="mx-4 cursor-pointer">Collection</Link>
        <a href="https://c4ei.net" target="_blank" rel="noopener noreferrer">AAH Home</a>
        <a href="https://c4ex.net" target="_blank" rel="noopener noreferrer">Buy AAH</a>
        <a href="https://docs.google.com/document/d/1S3HcMW2EmzvCEtDeF4JdSrbZOuO0JdPOHl5Stc0lhbE/edit?usp=sharing" target="_blank" rel="noopener noreferrer">사용법(DOC)</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </ul>
{/* 
      <ThirdwebProvider clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={"dark"}
          connectModal={{ size: "wide" }}
        />
      </ThirdwebProvider> */}

      {/* <button onClick={() => switchChain(AllAboutHealthy.chainId)}>
        Switch to AAH
      </button> */}

      {connectedAccount ? (
        <button
          className="shadow-xl shadow-black text-white
          bg-green-500 hover:bg-green-700 md:text-xs p-2
          rounded-full cursor-pointer text-xs sm:text-base"
        >
          {connectedChainId} {truncate(connectedAccount, 4, 4, 11)}
          
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white
          bg-green-500 hover:bg-green-700 md:text-xs p-2
          rounded-full cursor-pointer text-xs sm:text-base"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  )
}
export default Header
