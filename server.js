const path = require('path');
// Add Dependencies
const express = require('express');
const dotenv = require('dotenv');

// Point detenv to config file with its path and access all env variables  
dotenv.config({ path: './config/config.env' });

// Initialize express app
const app = express();

// allow server to use body parser middleware 
// to use req.body in controller methods
app.use(express.json());

// access env variables from config file via dotenv (or 5000 if not accessible)
const PORT = process.env.PORT || 5000;

// Run the server on port (defined in .env file in config)
// log message to console with colors 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));