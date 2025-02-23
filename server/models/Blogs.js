const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    body: {
        type: String,
        required: true 
    },
    author_id: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true 
    },

  
        Auth_Name: { type: String },
        Auth_Img: { type: String },
        Auth_Email: { type: String },
        Auth_Degree: { type: String },
        Auth_Grad_Year: { type: String },
        Auth_isProj: { type: Boolean },
        Auth_isVerified: { type: Boolean },
     
    status: {
        type: String,
        enum: ["Not-verified", "Verified"],
        default: "Not-verified",
        required: true
    },
    posted:{
        type: Date,
        default: Date.now(),
        required: true
    },
    cat: {
        type: String,
        enum: ["internship", "placement", "organization"],
        required: true
    },
    approval:{
        type: String,
        enum: ["Pending", "Approved", "Denied"],
        default: "Pending",
        required: true
    },
    upvote:{type:Number , default: 0},
    upvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comment: [{
        type: String,
        default: null,
    }]
});

const Blog = mongoose.model('Blog', BlogsSchema);

module.exports = Blog;
