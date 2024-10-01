const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const NewsDetail = require('./src/components/NewsDetail/NewsDetail');

const app = express();

app.get('/news/:id', (req, res) => {
    const post = {}; // Fetch or define your post here
    const relatedPosts = []; // Fetch or define your related posts here
    const content = renderToString(<NewsDetail post={post} relatedPosts={relatedPosts} />);
    res.send(`<html><body>${content}</body></html>`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
