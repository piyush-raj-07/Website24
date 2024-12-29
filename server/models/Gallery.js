const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({

  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    
  },
  subtitle: {
    type: String,
   
  },
});


const GalleryModel = mongoose.model('gallery', GallerySchema);
module.exports = GalleryModel;
