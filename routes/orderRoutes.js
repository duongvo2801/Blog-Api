const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { createResponse } = require('../models/responseHelper');

// Create a new order
router.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user').populate('orderDetails');
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific order
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('orderDetails');
        if (!order) {
            return res.status(404).send();
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an order
router.put('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send();
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete an order
router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send();
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
