const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail');
const { createResponse } = require('../models/responseHelper');

// Create a new order detail
router.post('/orderdetails', async (req, res) => {
    const orderDetail = new OrderDetail(req.body);
    await orderDetail.save((error, document) => {
        if (error) {
            // res.status(500).send(error);
            res.status(500).json(createResponse('error', null, error.message));
        } else {
            // res.status(201).send(document);
            res.status(201).json(createResponse('success', document, 'Order detail added successfully'));
        }
    });
});

//... Other CRUD operations for Order Details ...

module.exports = router;
