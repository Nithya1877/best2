const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Corrected path to mainRoutes
const mainRoutes = require('../routes');  // Adjusted to the correct path
app.use("/api", routes);  // Added /api prefix to match Postman

// Error handling
app.use((req, res, next) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`); // Added logging
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
