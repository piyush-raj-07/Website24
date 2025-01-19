const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({

  url1: {
    type: String,
    required: true,
  },

  url2: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    
  },

  description: {
    type: String,
   
  },
});


const ActivitiesModel = mongoose.model('Activities', ActivitiesSchema);
module.exports = ActivitiesModel;
