const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { createResponse } = require('../models/responseHelper');

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        // res.status(201).send(category);
        res.status(201).json(createResponse('success', category, 'Category created successfully'));
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        // res.send(categories);
        res.json(createResponse('success', categories, 'Categories fetched successfully'));
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));
    }
});

// Get a specific category
router.get('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            // return res.status(404).send();
            return res.status(404).json(createResponse('error', null, 'Category not found'));
        }
        // res.send(category);
        res.json(createResponse('success', category, null));
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));
    }
});

// Update a category
router.put('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            // return res.status(404).send();
            return res.status(404).json(createResponse('error', null, 'Category not found'));
        }
        // res.send(category);
        res.json(createResponse('success', category, null));
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));
    }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            // return res.status(404).send();
            return res.status(404).json(createResponse('error', null, 'Category not found'));
        }
        // res.send(category);
        res.json(createResponse('success', category, null));
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));
    }
});

module.exports = router;
