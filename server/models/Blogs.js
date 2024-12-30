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
    }
});

const Blog = mongoose.model('Blog', BlogsSchema);

module.exports = Blog;
