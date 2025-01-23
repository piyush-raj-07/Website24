const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoute');
const quizRoutes = require('./routes/quizRoute');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const ActivitiesModel = require('./models/Activities');
const UserModel = require('./models/Users');
const GalleryModel = require('./models/Gallery');
const NewsModel = require('./models/News');


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

app.use('/blog', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/quiz', quizRoutes);


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

//Getuserdata BY Id

app.get('/user/:id' , async(req,res)=>{
    try {
        const userId = req.params.id; // Get ID from the URL parameter
        const userdetail = await UserModel.findById(userId); // Use findById for a single document
        
        if (!userdetail) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(userdetail);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
})

//update user details
app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, degree, batch, intro, imageUrl, is_Proj} = req.body;

        // Find user and update
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                Name: username,
                Degree: degree,
                Grad_Year: batch,
                About: intro,
                Img_URL: imageUrl || null,
                is_Proj: is_Proj || false,
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});




//News Data
app.post('/NewsData', async (req, res) => {

    const {
        Image_URL,
        Description,
        Act_Slider
    } = req.body;

    try {
        const newdata = new NewsModel({ Image_URL, Description, Act_Slider });
        const savedata = await newdata.save();
        res.status(201).json(savedata);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
})

app.get('/GetData', async (req, res) => {
    try {
        const data = await NewsModel.find();
        res.send(data);
    } catch (error) {
        console.error('Error getting image', error);
    }
})

//Gallery
app.get('/GetGallery', async (req, res) => {
    try {
        const images = await GalleryModel.find();
        res.status(200).json(images);
    } catch (error) {
        console.log('err getting gallery', error);
    }
})

// Save Image for gallery
app.post('/SaveGallery', async (req, res) => {

    const {
        url, title, subtitle
    } = req.body;

    try {
        const newImage = new GalleryModel({
            url,
            title,
            subtitle,
        });
        await newImage.save();
        res.status(201).json("img saved");
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to save image' });
    }
})

app.get('/GetActivity', async (req, res) => {
    try {
        console.log('Fetching activities from database...');
        const activities = await ActivitiesModel.find();
        console.log('Found activities:', activities);
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: error.message });
    }
});

app.put('/EditActivity/:id', async (req, res) => {
    const { id } = req.params;
    const { url1, url2, title, description } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Activity ID is required' });
    }

    try {
        const updatedActivity = await ActivitiesModel.findByIdAndUpdate(
            id,
            { url1, url2, title, description },
            { new: true }
        );

        if (!updatedActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        console.log('Activity updated:', updatedActivity);
        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ error: 'Failed to update activity' });
    }
});


app.post('/SaveActivity', async (req, res) => {

    const {
        url1, url2, title, description
    } = req.body;

    try {
        const newImage = new ActivitiesModel({
            url1,
            url2,
            title,
            description,
        });
        await newImage.save();
        res.status(201).json("img saved");
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to save image' });
    }
})


app.delete('/DeleteActivity/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedActivity = await ActivitiesModel.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        console.log('Activity deleted:', deletedActivity);
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});

// Quiz data
app.post('/Quizdata', async (req, res) => {

    const {
        Question,
        Options,
        CorrectAnswerIndex
    } = req.body

    try {
        const newques = new QnAModel({ Question, Options, CorrectAnswerIndex });
        const saveques = await newques.save();
        res.status(201).json(saveques);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to save question' });
    }
})

app.get('/GetQuestion', async (req, res) => {
    try {
        const ques = await QnAModel.find();
        res.send(ques);
    } catch (error) {
        console.error('Error getting question', error);
    }
})
app.listen(PORT, () => {
    console.log("SERVER STARTED ");
});


