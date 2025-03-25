const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const BASE_URL = 'https://example.com/api'; // Replace with actual API URL

// Fetch all books
app.get('/books', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books list' });
    }
});

// Fetch book by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/${req.params.isbn}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book by ISBN' });
    }
});

// Fetch books by author
app.get('/books/author/:author', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/author/${req.params.author}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books by author' });
    }
});

// Fetch books by title
app.get('/books/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/title/${req.params.title}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books by title' });
    }
});

// Fetch book reviews
app.get('/books/review/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/review/${req.params.isbn}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book review' });
    }
});

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Add or modify a book review
app.post('/books/review', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/books/review`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error adding/modifying review' });
    }
});

// Delete a book review
app.delete('/books/review/:isbn', async (req, res) => {
    try {
        const response = await axios.delete(`${BASE_URL}/books/review/${req.params.isbn}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book review' });
    }
});

// Fetch all books using an async callback function
function getAllBooks(callback) {
    axios.get(`${BASE_URL}/books`)
        .then(response => callback(null, response.data))
        .catch(error => callback(error, null));
}

app.get('/async/books', (req, res) => {
    getAllBooks((error, data) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching books list' });
        } else {
            res.json(data);
        }
    });
});

// Search book by ISBN using Promises
function searchByISBN(isbn) {
    return axios.get(`${BASE_URL}/books/${isbn}`);
}

app.get('/promise/isbn/:isbn', (req, res) => {
    searchByISBN(req.params.isbn)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error fetching book by ISBN' }));
});

// Search books by author using Promises
function searchByAuthor(author) {
    return axios.get(`${BASE_URL}/books/author/${author}`);
}

app.get('/promise/author/:author', (req, res) => {
    searchByAuthor(req.params.author)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error fetching books by author' }));
});

// Search books by title using Promises
function searchByTitle(title) {
    return axios.get(`${BASE_URL}/books/title/${title}`);
}

app.get('/promise/title/:title', (req, res) => {
    searchByTitle(req.params.title)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error fetching books by title' }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
