require("dotenv").config();
require("express-async-errors");
const express = require("express");
const APP = express();
const connectDB = require("./db/connect.js");
const productsRouter = require("./routes/products.js");
const errorMiddleware = require("./middleware/errorHandler.js");
const notFound = require("./middleware/notFound.js");

// middleware
APP.use(express.json());

// routes
APP.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

APP.use("/api/v1/products", productsRouter);

// products route
APP.use(notFound);
APP.use(errorMiddleware);

// configure port, connection DB, run server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("CONNECTED TO DB!");;
        APP.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    };
};

// start server
start();
