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


app.listen(PORT, () => {
    console.log("SERVER STARTED ");
});
