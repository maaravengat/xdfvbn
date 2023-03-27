const { Sequelize, DataTypes }= require("sequelize");

const sequelize = new Sequelize(
    'Register_Form',
    'root',
    'Root123!',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );

   sequelize.authenticate(). then(()=> {
    console.log("SuccesFully Created");

   }). catch((error) => {
    console.error("unable To connect databases", error);
   });


   const Register = sequelize.define("form" , {
    firstname:{
        type: DataTypes.STRING,
     allowNull: false
    },
    lastname: {
        type:DataTypes.STRING,
        allowNull:false
    },
    dob: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    


      
   })

  
   sequelize.sync().then(() => {
    console.log('form table created successfully!');

    // Register.create({
    //     firstname:"654",
    //   lastname:"4245",
    //       dob:"2023-02-22",
    //   email:"ve@gmail.com",
    //    }).then((res) =>{
    //       console.log(res);
    //     }) .catch((error)=>{
    //      console.error("Not Inserted" , error);
    //     })
     
    
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 

 module.exports =  Register
 