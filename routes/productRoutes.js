
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const { createResponse } = require('../models/responseHelper');

const fs = require('fs');



const upload = multer({
    limits: {
        fileSize: 5000000 // Giới hạn kích thước tệp (5MB)
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Vui lòng tải lên một tệp hình ảnh.'));
        }
        cb(undefined, true);
    }
});


// Testing new Image handle
router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const productData = {...req.body};
        // Log the requeste to request-log.txt
        fs.writeFileSync('request-log.txt', JSON.stringify(req.body, null, 2));
        // console.log(JSON.stringify(req.body, null, 2));

        // If the image field in req.body is an object (representing the Image type)
        if (req.body.image && Array.isArray(req.body.image.data)) {
            const byteData = req.body.image.data;
            // Convert array of integers back to Buffer
            productData.image = Buffer.from(byteData);
        } else if (typeof req.body.image === 'string') {
            productData.image = req.body.image;  // Handle as a URL
        } else if (req.file && req.file.buffer) {
            productData.image = req.file.buffer;  // Handle as binary image data
        } else {
            throw new Error("Invalid image data");
        }

        productData.price = parseFloat(productData.price);
        const product = new Product(productData);
        await product.save();

        res.status(201).json(createResponse('success', product, 'Product created successfully'));
    } catch (error) {
        console.log("New product error: " + error.message);
        res.status(500).json(createResponse('error', null, error.message));
    }
});



// Upload image for a specific product
router.post('/products/:id', upload.single('image'), async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!req.file || !req.file.buffer) {

            throw new Error("Invalid image data");
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json(createResponse('error', null, 'Product not found'));
        }

        product.image = req.file.buffer;
        await product.save();

        res.json(createResponse('success', product, 'Product image uploaded successfully'));
    } catch (error) {
        res.status(500).json(createResponse('error', null, error.message));
    }
});


// Get all products
router.get('/products', async (req, res) => {

    try {
        const products = await Product.find({}).populate('category');
        // console.log("Products fetched:", products);
        // res.send(products);
        res.json(createResponse('success', products, 'Products fetched successfully'));

    } catch (error) {
             console.error("Error fetching products:", error);
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));

    }
});

// // Upload image
// router.post('/products', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file || !req.file.buffer) {
//             throw new Error("Invalid image data");
//         }

//         const product = new Product({
//             image: req.file.buffer,
//             // You can add other product details here if required
//         });
//         await product.save();

//         res.status(201).json(createResponse('success', product, 'Product created with image successfully'));
//     } catch (error) {
//         console.log("Image upload error: "+error.message);
//         res.status(500).json(createResponse('error', null, error.message));
//     }
// });

// router.put('/products/:id', upload.single('image'), async (req, res) => {
//     try {
//         const productId = req.params.id;
//           // If the image field in req.body is an object (representing the Image type)
  
//          if (!req.file || !req.file.buffer) {
//             throw new Error("Invalid image data");
//         }

//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json(createResponse('error', null, 'Product not found'));
//         }

//         product.image = req.file.buffer;
//         await product.save();

//         res.json(createResponse('success', product, 'Product image updated successfully'));
//     } catch (error) {
//         res.status(500).json(createResponse('error', null, error.message));
//     }
// });



// Get a specific product
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.json(createResponse('success', product, null));

        if (!product) {
            // return res.status(404).send();
        res.status(404).json(createResponse('error', null, 'Product not found'));

        }
        res.send(product);
    } catch (error) {
        // res.status(500).send(error);
        res.status(500).json(createResponse('error', null, error.message));

    }
});

    // put old
// router.put('/products/:id', upload.single('image'), async (req, res) => {
//     console.log("Received body:", req.body);
//     console.log("Received file:", req.file);
//     const updates = {
//         name: req.body.name,
//         price: parseFloat(req.body.price),
//         description: req.body.description,
//         category: req.body.category
//     };

//     if (req.file && req.file.buffer) {
//         updates.image = req.file.buffer;
//     } else {
//         throw new Error("Invalid image data");
//     }

//     console.log("Updating product with ID:", req.params.id);
//     console.log("Received updates:", updates);

//     const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
//     if (product) {
//         res.send(product);

//     }else{
//         return res.status(404).json(createResponse('error', null, 'Product not found'));

//     }
// });
// put new 
router.put('/products/:id', upload.single('image'), async (req, res) => {
    try {
        console.log("Received body:", req.body);
        console.log("Received file:", req.file);

        const updates = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            category: req.body.category
        };

        // If the image field in req.body is an object (representing the Image type)
        if (req.body.image && Array.isArray(req.body.image.data)) {
            const byteData = req.body.image.data;
            // Convert array of integers back to Buffer
            updates.image = Buffer.from(byteData);
        } else if (typeof req.body.image === 'string') {
            updates.image = req.body.image;  // Handle as a URL
        } else if (req.file && req.file.buffer) {
            updates.image = req.file.buffer;  // Handle as binary image data
        } else {
            throw new Error("Invalid image data");
        }

        console.log("Updating product with ID:", req.params.id);
        console.log("Received updates:", updates);

        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (product) {
            res.send(product);
        } else {
            return res.status(404).json(createResponse('error', null, 'Product not found'));
        }
    } catch (error) {
        console.log("Update product error: " + error.message);
        res.status(500).json(createResponse('error', null, error.message));
    }
});


// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id, req.body,{new: true, runValidators: true });
        if (!product) {
            // return res.status(404).send();
           return res.status(404).json(createResponse('error', null, 'Product not found'));

        }
        res.json(createResponse('success', product, 'Product deleted successfully'));
    } catch (error) {
        console.error("Error occurred:", error);
        // res.status(500).send(error);
        return res.status(500).json(createResponse('error', null, error.message));

    }
});

module.exports = router;
