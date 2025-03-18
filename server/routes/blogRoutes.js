const express = require('express');
const verifyToken= require('../middleware/verifyToken');
const { writeBlog, deleteBlog, editBlog, getAllBlogs, getAllBlogsByCategory, getBlog, getMyBlogs,upvotePost } = require('../controllers/blogController');

const router = express.Router();
router.post('/write',verifyToken, writeBlog);
router.put('/edit/:id',verifyToken, editBlog);
router.delete('/delete/:id',verifyToken,deleteBlog);
// router.get('/allblog',getAllBlogs);
router.get("/catblog/:cat",getAllBlogsByCategory);
router.get('/single/:id',getBlog);
router.get('/myBlog',verifyToken, getMyBlogs)
router.post('/upvote/:id',verifyToken,upvotePost)
module.exports = router;