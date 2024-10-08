const Product = require("../models/product.js");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ featured: true });
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "products route" });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic
};