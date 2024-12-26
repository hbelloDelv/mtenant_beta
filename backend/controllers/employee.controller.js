const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const companySchema = require('../models/company.schema')



const registerClient = async (req, res) => {
    try {
        const collectionName = req.collectionName; // Access collectionName from middleware

        const { firstName, lastName, email, phoneNumber} = req.body;

        const phoneNumberParse = parseInt(phoneNumber)

        const companyModel = mongoose.models[collectionName] 
            || mongoose.model(collectionName, companySchema, collectionName);

        const existingEmail = await companyModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: `Email ${email} is already registered.` });
        }

        const newClint = new companyModel({
            firstName,
            lastName,
            email,
            phoneNumber: phoneNumberParse,
            // password: hashedPassword,
            role: 'client',
        });

        await newClint.save();

        res.status(201).json({
            success: true,
            message: `Client ${firstName} ${lastName} registered successfully in ${collectionName}.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const viewClients = async (req, res) => {
    try {
        const collectionName = req.collectionName; // Access collectionName from middleware

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

        const companyModel = mongoose.model(collectionName, companySchema, collectionName);

        const email = decoded.email;
        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        // Check if the user exists
        const user = await companyModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Fetch all employees with role 'client'
        const clients = await companyModel.find({ role: "client" });

        res.json( clients);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    registerClient,
    viewClients,
}