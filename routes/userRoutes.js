const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/userController');
const { createResponse } = require('../models/responseHelper');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
        console.log(user);
        
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
    
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        
        }
        res.send(user);
        console.log(user);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

router.post('/register', userController.register);
router.post('/login', userController.login);
// API endpoints for registration and login
// router.post('/register', async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const user = new User({
//         username,
//         password: hashedPassword,
//       });
  
//       await user.save();
  
//       res.status(201).json({ message: 'Registration successful' });
//     } catch (err) {
//       res.status(500).json({ error: 'Registration failed' });
//     }
//   });
  
//   router.post('/login', async (req, res) => {
//     try {
//       const { username, password } = req.body;
  
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(401).json({ error: 'Authentication failed' });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Authentication failed' });
//       }
  
//       res.status(200).json({ message: 'Login successful' });
//     } catch (err) {
//       res.status(500).json({ error: 'Login failed' });
//     }
//   });


module.exports = router;
