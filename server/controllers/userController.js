const UserModel = require('../models/Users');

getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const userdetail = await UserModel.findById(userId);

        if (!userdetail) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(userdetail);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { username, degree, batch, intro, imageUrl, is_Proj } = req.body;


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
}

module.exports = { getUserDetails, updateUserDetails };