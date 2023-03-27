const { Sequelize  ,DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    'Register_Form',
    'root',
    'Root123!',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );

   async function connect() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
//     async function connect () {
//         try {
//    sequelize.authenticate(). then(()=> {
//     console.log("SuccesFully Created");

//    }). catch((error) => {
//     console.error("unable To connect databases", error);
//    });
//     }
   const init = () => {
    const Todo = require('./Models/books')
   sequelize.sync().then(() => {
    console.log('form table created successfully!');

    
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
}
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

  
 
  module.exports = {
    connect,
    init,
    sequelize
  }