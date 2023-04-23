const User = require('../Models/Users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'});

exports.register = async (req, res) => {
  try {
    const email = await User.findOne({Email: req.body.Email})
    const cin = await User.findOne({CIN: req.body.CIN})

    if (email || cin) return res.status(400).json({ error: 'Email already exists' })

    const salt = await bcrypt.genSalt(10)
    const passwdHash = await bcrypt.hash(req.body.Password, salt)

    const user = new User({
      CIN: req.body.CIN,
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      Email: req.body.Email,
      Password: passwdHash,
      Telephone: req.body.Telephone,
      Fonction: req.body.Fonction,
    });

    await user.save();    
    res.status(201).json({ "message": 'User created' ,"user":user})
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(req.body.Password, user.Password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.json({ 'token': token, user: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getUsers = async (req, res) => {
    const { page = 1, limit = 4 } = req.query;
    try {
      const UserList = await User.find()
        .sort({ _id: 'desc' })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      const count = await User.count();
      res.status(200).json({
        success: true,
        count: Math.ceil(count / limit),
        User: UserList,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  exports.getUser = async (req, res) => {
    const User = await User.findOne({
      _id: req.params.id,
    })
    res.status(200).json({
      success: true,
      User,
    })
  }
  
  exports.addUser = async (req, res) => {
    const User = new User(req.body)
    await User.save()
    res.status(200).json({
      success: true,
      User,
    })
  }
  
  exports.updateUser = async (req, res) => {
    const UserUpdated = await User.updateOne(
      { _id: req.params.idUser },
      { $set: req.body }
    )
    res.status(200).json({
      success: true,
      UserUpdated,
    })
  }
  
  exports.deleteUser = async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.idUser })
    res.status(200).json({
      success: true,
      deletedUser,
    })
  }
  