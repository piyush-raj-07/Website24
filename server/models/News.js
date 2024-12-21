const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({

  Image_URL : {type : String , required : true },
  Description : {type : String},
  Act_Slider : {type : Boolean , default: false}  //when false data goes to activity page and when true goes to slider
});


const NewsModel = mongoose.model('news', NewsSchema);
module.exports = NewsModel;
