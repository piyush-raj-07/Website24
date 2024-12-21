const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({

  Image_URL : {type : String , required: true }
});


const GalleryModel = mongoose.model('gallery', GallerySchema);
module.exports = GalleryModel;
