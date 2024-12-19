const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const companySchema = require('../models/company.schema')


const verifyUser = async (req, res, next) => {
    try {
        const collectionName = req.modelName.trim();

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not provided" });
        }

        const decoded =  jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token not valid" });
        }

        let companyModel = mongoose.models[collectionName];
        if (!companyModel) {
            // Check if the collection exists in MongoDB
            const collections = await mongoose.connection.db.listCollections().toArray();
            const collectionExists = collections.some(col => col.name === collectionName);

            if (!collectionExists) {
                return res.status(404).json({ message: 'User not available' });
            }

            // Dynamically create a model for the collection
            companyModel = mongoose.model(collectionName, companySchema, collectionName);
        }

        const email = decoded.email;
        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        const user = await companyModel.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



module.exports = verifyUser