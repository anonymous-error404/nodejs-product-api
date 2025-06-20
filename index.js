const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// In-memory product array
let products = [
    { id: 1, name: 'Laptop', description: 'Gaming laptop', price: 1200 },
    { id: 2, name: 'Phone', description: 'Smartphone', price: 800 },
];

// GET /products
app.get('/products', (req, res) => {
    res.json(products);
});

// POST /products
app.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !description || price === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        description,
        price,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter((product) => product.id !== id);

    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ message: 'Product deleted successfully.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
