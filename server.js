require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let error = null;
    let articles = [];

    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                country: 'us', // Change to your preferred country
                apiKey: API_KEY
            }
        });

        articles = response.data.articles;
    } catch (err) {
        error = 'Failed to fetch news. Please try again later.';
    }

    res.render('index', { articles, error });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
