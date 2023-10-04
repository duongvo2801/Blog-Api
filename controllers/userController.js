const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createResponse } = require('../models/responseHelper');


exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log(user);

    res.status(201).json(createResponse('success', { user, token }, 'User registered successfully'));
  } catch (error) {
    res.status(400).json(createResponse('error', null, error.message));
    console.log(error);
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json(createResponse('error', null, 'Invalid login credentials'));
    }
    console.log("Username:", username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(createResponse('error', null, 'Invalid login credentials'));
    }
    console.log(typeof password, typeof user.password);
    console.log("Password Match:", isMatch);
    
    const token = jwt.sign({ _id: user._id.toString() }, '123', { expiresIn: '1h' });  // Thay 'YOUR_SECRET_KEY' bằng secret key
  

    res.json(createResponse('success', { user, token }, 'User logged in successfully'));
  } catch (error) {
    res.status(500).json(createResponse('error', null, error.message));
  }
}
