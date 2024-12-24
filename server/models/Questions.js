const mongoose = require('mongoose');

const QnASchema = new mongoose.Schema({

  Question : {type : String , required: true },
  Options: { 
    type: [String], 
},
CorrectAnswerIndex: { type: Number, required: true }

});


const QnAModel = mongoose.model('quiz', QnASchema);
module.exports = QnAModel;
