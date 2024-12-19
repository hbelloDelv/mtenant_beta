// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const companySchema = require('../models/company.schema')



const registerClient = async (req, res) => {
    try {
        const collectionName = req.collectionName; // Access collectionName from middleware

        const { firstName, lastName, email, phoneNumber} = req.body;

        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: `Passwords do not match` });
        // }

        // const saltRounds = 10;
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPassword = await bcrypt.hash(password, salt);
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



module.exports = {
    registerClient
}