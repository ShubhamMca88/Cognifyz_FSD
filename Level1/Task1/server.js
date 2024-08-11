const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submissions
app.post('/submit', (req, res) => {
  const { name, email, } = req.body;

  // Server-side validation
  if (!name || !email ) {
    return res.status(400).send("All fields must be filled out");
  }

  // Store validated data in temporary server-side storage
  const formData = {
    name,
    email,
  };

  // Log the form data (or handle it as needed, e.g., save to a database)
  console.log("Received form submission:", formData);

  res.send("Form submitted successfully!");
});

// Set the port to listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
