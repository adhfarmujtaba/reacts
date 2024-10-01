require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const { renderToString } = require('react-dom/server');
const NewsDetail = require('./src/components/NewsDetail/NewsDetail').default;

const app = express();

// Example route
app.get('/news/:postSlug', (req, res) => {
    const post = {}; // Fetch your post data here
    const relatedPosts = []; // Fetch related posts data here

    const content = renderToString(<NewsDetail post={post} relatedPosts={relatedPosts} />);
    res.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>News Detail</title>
        </head>
        <body>
            <div id="root">${content}</div>
        </body>
    </html>`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
