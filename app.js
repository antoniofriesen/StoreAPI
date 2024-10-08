require("dotenv").config;
// async errors
const express = require("express");
const APP = express();

const notFoundMiddleware = require("./middleware/not-found.js");
const errorMiddleware = require("./middleware/error-handler.js");
const notFound = require("./middleware/not-found.js");

// middleware
APP.use(express.json());

// routes
APP.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
// products route
APP.use(notFound);
APP.use(errorMiddleware);

// configure port, connection DB, run server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connectDB
        APP.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    };
};

// start server
start();
