const express = require("express")
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const multer = require("multer");
const schema = require('./Schema/schema')

const path = require("path")
const { graphqlHTTP } = require("express-graphql");
const fs =require('fs')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var maxSize = 1 * 1000 * 1000;
app.use('/graphql', graphqlHTTP({

  schema,
  
  graphiql: true,


}));



const storage = multer.diskStorage({

  destination: (req, res, cb) => {
    cb(null, '../../public/image')
  },
  filename: (req, file, cb) => {
    // const fileName =  
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)

  }
})
const upload = multer({ storage: storage, limits: { fileSize: maxSize } });

app.post('/uploads', upload.single('file'), async (req, res) => {
  console.log(req.file, '======================');
  try {
    if (req.file) {
      console.log('fdsdfgdstfds');
      return res.send({ status: 200, message: 'Please upload an image succesfully', file: req.file });
    }
  }
  catch (error) {
    console.log(error, 'dfghjkl');
  }

});
app.post ('/favicon',upload.single('file'), async (req, res) => {
  
  // const imagePath = `../../public/image/${req.file.filename}`
  // fs.unlinkSync(imagePath)

  // const newImagePath = `../../public/image/${req.file.filename}`
  // fs.writeFileSync(newImagePath,JSON.stringify(req.file) )
  try {
    if (req.file) {
      console.log( req.file,'fdsdfgdstfds');
      return res.send({ status: 200, message: 'Please upload an image succesfully', file: req.file });
    }
  }
  catch (error) {
    onsole.log(error, 'dfghjkl');
  }
  
})


app.listen(4000, () => {
  console.log("Server Run On Port 4000");
})
