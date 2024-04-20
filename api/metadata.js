require('dotenv').config()
const sharp = require('sharp')
const { faker } = require('@faker-js/faker')
// const ipfsClient = require('ipfs-http-client')
const axios = require('axios')

const updImgToIPFS = async (file) => {
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_PINATA_URL,
        data: formData,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECET,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return ImgHash;
    } catch (error) {
      console.log("Unable to upload image to Pinata");
    }
  }
};

const attributes = {
  weapon: [
    'Stick',
    'Knife',
    'Blade',
    'Club',
    'Ax',
    'Sword',
    'Spear',
    'Halberd',
  ],
  environment: [
    'Space',
    'Sky',
    'Deserts',
    'Forests',
    'Grasslands',
    'Mountains',
    'Oceans',
    'Rainforests',
  ],
  rarity: Array.from(Array(6).keys()),
}
const toMetadata = ({ id, name, description, price, image }) => ({
  id,
  name,
  description,
  price,
  image,
  demand: faker.random.numeric({ min: 10, max: 100 }),
  attributes: [
    {
      trait_type: 'Environment',
      value: attributes.environment.sort(() => 0.5 - Math.random())[0],
    },
    {
      trait_type: 'Weapon',
      value: attributes.weapon.sort(() => 0.5 - Math.random())[0],
    },
    {
      trait_type: 'Rarity',
      value: attributes.rarity.sort(() => 0.5 - Math.random())[0],
    },
    {
      display_type: 'date',
      trait_type: 'Created',
      value: Date.now(),
    },
    {
      display_type: 'number',
      trait_type: 'generation',
      value: 1,
    },
  ],
})
const toWebp = async (image) => await sharp(image).resize(500).webp().toBuffer()
const uploadToIPFS = async (data) => {
  /*
  const created = await client.add(data)
  return `https://ipfs.io/ipfs/${created.path}`
  */
  console.log("82 /api/metadata.js data : "+data);
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: data,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECET,
        "Content-Type": "application/json",
      },
    });

    const saved_ipfs_url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    console.log(saved_ipfs_url);
    return saved_ipfs_url;

  } catch (error) {
    console.log("Error while creating NFT / "+error);
  }
}

exports.toWebp = toWebp
exports.toMetadata = toMetadata
exports.uploadToIPFS = uploadToIPFS
exports.updImgToIPFS = updImgToIPFS