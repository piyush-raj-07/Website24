const UserModel=require('../models/Users');

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const user = await UserModel.findById(userId); 
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.Role !== 'admin') {
            return res.status(403).json({ message: 'User is not an admin' });
        }
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isAdmin;