const express = require('express');
const router = express.Router();
const ProductReview = require('../models/review');
const { createResponse } = require('../models/responseHelper');

// Create a new product review
router.post('/productreviews', async (req, res) => {
    const productReview = new ProductReview(req.body);
    await productReview.save((error, document) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(document);
        }
    });
});

//... Other CRUD operations for Product Reviews ...

module.exports = router;
