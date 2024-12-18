const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const UserModel = require('./models/Users');

const PORT = 5000;

require('dotenv').config();
const mongoURI = process.env.CSTRING;

mongoose.connect(  mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));



// storing user info
app.post ("/SaveUser" , async (req,res)=>{
 
    const {
    UserEmail ,
     Name,
     Img_Url,
     Grad_Year,
     Degree,
     About,
      Blogs ,
    is_Proj ,
     Role } = req.body;

    const exist = await UserModel.findOne({ UserEmail });
    if (exist) {
        return res.status(200).send("User already exists");
    }
    try {

           const NewUser = new UserModel (
            {  UserEmail,  
                Name,
                Img_Url,
                Grad_Year,
                Degree,
                About,
                 Blogs ,
                 is_Proj ,
                  Role}
        );
       await NewUser.save();
       res.send("Data Inserted")
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send("Error inserting data");
    }
})

app.get('/GetAllUsers', async (req,res)=>{

    try {
        const data = await UserModel.find();
        res.send(data);
    } catch (err) {
        console.error('Error inserting data:', err);
    }
   

})


app.listen(PORT, () => {
    console.log("SERVER STARTED ");
  });
  