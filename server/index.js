require("ignore-styles");
require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const express = require("express");
const { render } = require("./server"); // Make sure the path is correct

const app = express();

app.use(express.static("build")); // Serve static files

app.get("/*", (req, res) => {
  const html = render(req.url); // Ensure render returns valid HTML

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/static/css/main.css"> <!-- Adjust this path if necessary -->
        <title>Your App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/js/main.js"></script> <!-- Adjust this path if necessary -->
      </body>
    </html>
  `);
});

// Listen on the PORT provided by Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
