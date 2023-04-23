const mongoose = require('mongoose')
const dMSchema = new mongoose.Schema({
    Designation: {
      type: String,
      required: true
    },
    Marque: {
      type: String
    },
    Modele: {
      type: String
    },
    Service: {
      type: String,
      required: true
    },
    Etat: {
      type: Number,
      required: true
    }
  });
module.exports = mongoose.model('DM',dMSchema)