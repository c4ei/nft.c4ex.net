const cors = require('cors')
const fs = require('fs').promises
const express = require('express')
const fileupload = require('express-fileupload')
const { toWebp, toMetadata, uploadToIPFS, updImgToIPFS } = require('./metadata')

const app = express()

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.post('/process', async (req, res) => {
  try {
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    // const image = req.files.image
    const imageURL = req.body.imageURL

    if (!name || !description || !price || !imageURL) {
      return res
        .status(400)
        .send('name, description, and price must not be empty')
    }

    let params
    params = {
      id: Date.now(),
      name,
      description,
      price,
      image: imageURL,
    }
/*
    await toWebp(image.data).then(async (data) => {
      // const imageURL = await uploadToIPFS(data)
      const imageURL = await updImgToIPFS(image)
      console.log("app.js -> 58 imageURL : " + imageURL);

      params = {
        id: Date.now(),
        name,
        description,
        price,
        image: imageURL,
      }
    })
*/
    fs.writeFile('token.json', JSON.stringify(toMetadata(params)))
      .then(() => {
        fs.readFile('token.json')
          .then(async (data) => {
            const metadataURI = await uploadToIPFS(data)
            console.log({ ...toMetadata(params), metadataURI })
            return res.status(201).json({ ...toMetadata(params), metadataURI })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

app.listen(9000, () => {
  console.log('Listen on the port 9000...')
})
