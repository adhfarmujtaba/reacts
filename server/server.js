// server/server.js
import express from "express";
import { render } from "./server"; // Import the render function

const app = express();

app.use(express.static("build")); // Serve static files

app.get("/*", (req, res) => {
  const html = render(req.url); // Call the render function

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/static/css/main.css"> <!-- Include your CSS -->
        <title>Your App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/js/main.js"></script> <!-- Your bundled JS -->
      </body>
    </html>
  `);
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
