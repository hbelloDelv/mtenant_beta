const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const companySchema = require('../models/company.schema')

const verifyEmployee = async (req, res, next) => {
    try {
        const collectionName = req.headers.modelname?.trim();

        if (!collectionName) {
            return res.status(400).json({ success: false, error: "Model name not provided in headers" });
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token not valid" });
        }

        // Check if the collection exists in MongoDB
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === collectionName);

        if (!collectionExists) {
            return res.status(404).json({ success: false, error: "Collection does not exist" });
        }

        // Temporarily create a model without registering it globally
        const tempModel = mongoose.model(collectionName, companySchema, collectionName);

        const email = decoded.email;
        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        // Check if the user exists
        const user = await tempModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach collectionName to req object
        req.collectionName = collectionName;

        next(); // User exists, proceed to the next middleware
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};





module.exports = {
    verifyEmployee
}