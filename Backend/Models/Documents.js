const mongoose = require('mongoose')
const documentSchema = new mongoose.Schema({
    "id_dm": {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DM',
      required: true
    },
    Type: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      required: true
    }
  });
module.exports = mongoose.model('Document',documentSchema)