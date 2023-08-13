const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Sample data
let data = { message: "Hi, NewLook! :) " };
let apidata = { message: "api test data" };

// Middleware for security headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// GET method to read data
app.get('/data', (req, res) => {
  try {
    res.json(data);
    console.log(`Server has processed /data on port ${port}`);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(`Server failed to process /data on port ${port}`);
  }
});

// GET method to api data
app.get('/api', (req, res) => {
  try {
    res.json(apidata);
    console.log(`Server has processed /api on port ${port}`);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(`Server failed to process /api on port ${port}`);
  }
});

// PUT method to write data
app.put('/data', (req, res) => {
  try {
    const newData = req.body;
    if (newData && typeof newData === 'object') {
      data = newData;
      res.json({ message: "Data updated successfully!" });
    } else {
      res.status(400).json({ error: "Invalid data format" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(`Server internal error at ${req.url}`);
  }
});


// Health check endpoint
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found. Try /api or /data" });  
  console.log(`Server does not support the endpoint ${req.url}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
