const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    CIN: {
      type: String,
      required: true,
      unique: true
    },
    Nom: {
      type: String,
      required: true
    },
    Prenom: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },  
    Password: {
      type: String,
      required: true
    },
    Telephone: {
      type: String,
      required: true,
    },
    Fonction: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('User',userSchema)