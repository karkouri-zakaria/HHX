const mongoose = require('mongoose')
const archieveSchema = new mongoose.Schema({
    id_dm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DM',
      required: true
    },
    id_from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  id_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      required: true
    }
  });
module.exports = mongoose.model('Archieve',archieveSchema)