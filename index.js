const express = require("express")
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const multer = require("multer");
const schema = require('./Schema/schema')

const path = require("path")
const { graphqlHTTP } = require("express-graphql");
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
    cb(null, 'public/files')
  },
  filename: (req, file, cb) => {
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



app.listen(4000, () => {
  console.log("Server Run On Port 4000");
})
