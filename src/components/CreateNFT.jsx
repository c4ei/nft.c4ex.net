import axios from 'axios'
import { useState } from 'react'
// import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import picture6 from '../assets/images/noti.png'
import { setGlobalState, useGlobalState } from '../store'
import { createNftItem } from '../services/blockchain'

const uploadJsonToIPFS = async (data) => {
  // console.log("10 /src/components/CreateNFT.jsx data : "+data);
  try {
    const response = await axios({
      method: "POST",
      url: process.env.REACT_APP_PINATA_URL, //"https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: data,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECET,
        "Content-Type": "application/json",
      },
    });

    const saved_ipfs_url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    // console.log(saved_ipfs_url);
    return saved_ipfs_url;

  } catch (error) {
    console.log("Error while creating NFT / "+error);
  }
}

const CreateNFT = () => {
  const [boxModal] = useGlobalState('boxModal')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [imgBase64, setImgBase64] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !price || !description || !fileUrl) return

    let params = { id: Date.now(),name,description,price,image: fileUrl,}
    const metadataURI = await uploadJsonToIPFS(params)
    let image = fileUrl
    // alert("56 : "+fileUrl+":fileUrl");
    await createNftItem({name, description, image, metadataURI, price}).then(async () => { 
      //closeModal() 
    }).catch((e) => alert('some thing wrong!'+e))
              // .catch(() => reject())

  /*
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    // formData.append('image', fileUrl)
    formData.append('imageURL', fileUrl)
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await axios
          .post('https://nftapi.c4ei.net/process', formData)
          .then(async (res) => {
            await createNftItem(res.data)
              .then(async () => {
                closeModal()
                resolve()
              })
              .catch(() => reject())
            reject()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Minting & saving data to chain...',
        success: 'Minting completed, will reflect within 30sec 👌',
        error: 'Encountered error 🤯',
      },
    )
  */
  }

  const updImgToIPFS = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECET,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        // console.log("109 updImgToIPFS ImgHash:" + ImgHash +" setFileUrl(ImgHash) ");
        setFileUrl(ImgHash)
        setImgBase64(ImgHash)
        return ImgHash;
      } catch (error) {
        console.log("Unable to upload image to Pinata");
      }
    }
  };
  
  const changeImage = async (e) => {

    const reader = new FileReader()
    // console.log("/src/components/CreateNFT.jsx 52"+e.target.files[0].name);
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = (readerEvent) => {
      // const file = readerEvent.target.result
      // setImgBase64(file)
      // setFileUrl(e.target.files[0])
      const _upd_file_url = updImgToIPFS(e.target.files[0]) 
      // console.log("/src/components/CreateNFT.jsx 122 : IPFS url "+_upd_file_url);
      // setFileUrl(_upd_file_url)
    }

  }

  const closeModal = () => {
    setGlobalState('boxModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setFileUrl('')
    setImgBase64(null)
    setName('')
    setPrice('')
    setDescription('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${boxModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#25bd9c] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400 italic">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={imgBase64 || picture6}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19212c] file:text-gray-300
                  hover:file:bg-[#1d2631]
                  cursor-pointer focus:ring-0 focus:outline-none"
                onChange={changeImage}
                required
              />
            </label>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 px-4 py-2"
              type="text"
              name="name"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 px-4 py-2"
              type="number"
              name="price"
              step={0.01}
              min={0.01}
              placeholder="Price (AAH)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-18 py-2 px-4"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-[#25bd9c]
              py-2 px-5 rounded-full
              drop-shadow-xl border border-transparent
              hover:bg-transparent hover:text-[#ffffff]
              hover:border hover:border-[#25bd9c]
              focus:outline-none focus:ring mt-5"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNFT
