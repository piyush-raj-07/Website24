const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const UserModel = require('./models/Users');
const GalleryModel = require('./models/Gallery');
const NewsModel = require('./models/News');
const QnAModel = require('./models/Questions');

const PORT = 5000;

require('dotenv').config();
const mongoURI = process.env.CSTRING;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error: ', err));

// authentication routes
app.use("/api/auth", authRoutes);

// storing user info
app.post("/SaveUser", async (req, res) => {

    const {
        UserEmail,
        Name,
        password,
        Img_Url,
        Grad_Year,
        Degree,
        About,
        Blogs,
        is_Proj,
        Role } = req.body;

    const exist = await UserModel.findOne({ UserEmail });
    if (exist) {
        return res.status(200).send("User already exists");
    }
    try {

        const NewUser = new UserModel(
            {
                UserEmail,
                Name,
                password,
                Img_Url,
                Grad_Year,
                Degree,
                About,
                Blogs,
                is_Proj,
                Role
            }
        );
        await NewUser.save();
        res.send("Data Inserted")
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send("Error inserting data");
    }
})

app.get('/GetAllUsers', async (req, res) => {

    try {
        const data = await UserModel.find();
        res.send(data);
    } catch (err) {
        console.error('Error inserting data:', err);
    }


})

// Save Image for gallery
app.post('/SaveImage', async(req,res) =>{
   
    const{
        Image_URL
     } = req.body;

    try {
      const newImg = new GalleryModel({Image_URL});
      const saveImg = await newImg.save();
      res.status(201).json(saveImg);
    } catch (error) {
        res.status(500).json({error : 'Failed to save image'});
    }
})

app.get('/GetImage' , async(req,res)=>{
    try {
        const Img = await GalleryModel.find();
        res.send(Img);
    } catch (error) {
        console.error('Error getting image' , error);
    }
})

//News Data
app.post('/NewsData', async(req,res) =>{
   
    const{
        Image_URL,
        Description,
        Act_Slider
     } = req.body;

    try {
      const newdata = new NewsModel({Image_URL , Description , Act_Slider});
      const savedata = await newdata.save();
      res.status(201).json(savedata);
    } catch (error) {
        res.status(500).json({error : 'Failed to save data'});
    }
})

app.get('/GetData' , async(req,res)=>{
    try {
        const data = await NewsModel.find();
        res.send(data);
    } catch (error) {
        console.error('Error getting image' , error);
    }
})


// Quiz data
app.post('/Quizdata' , async(req,res)=>{

    const {
        Question,
        Options,
      CorrectAnswerIndex
    } = req.body

    try {
        const newques = new QnAModel({Question , Options , CorrectAnswerIndex});
        const saveques = await newques.save();
        res.status(201).json(saveques);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Failed to save question'});
    }
})

app.get('/GetQuestion' , async(req,res)=>{
    try {
        const ques = await QnAModel.find();
        res.send(ques);
    } catch (error) {
        console.error('Error getting question' , error);
    }
})
app.listen(PORT, () => {
    console.log("SERVER STARTED ");
});
