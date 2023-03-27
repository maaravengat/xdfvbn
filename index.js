

const express =require("express")
const cors =require('cors')
const app = express();

const schema = require('./Schema/schema')

const {graphqlHTTP}= require("express-graphql");
 app.use(cors())

 app.use('/graphql', graphqlHTTP({

  schema,
  graphiql: true,
  

}));


//  Register.create({
//     firstname:"Vetri",
//     lastname:"Maaran",
//     dob:"22-07-2023",
//     email:"ve@gmail.com",
//   }).then((res) =>{
//     console.log(res);
//   }) .catch((error)=>{
//     console.error("Not Inserted" , error);
//   })

  app.listen(4000, () => {
    console.log("Server Run On Port 4000");
  })
 