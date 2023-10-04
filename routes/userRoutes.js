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


module.exports = router;
