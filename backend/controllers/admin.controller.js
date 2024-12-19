const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const companySchema = require('../models/company.schema')



const registerEmployee = async (req, res) => {
    try {
        const collectionName = req.collectionName; // Access collectionName from middleware

        const { firstName, lastName, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: `Passwords do not match` });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const companyModel = mongoose.models[collectionName] 
            || mongoose.model(collectionName, companySchema, collectionName);

        const existingEmail = await companyModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: `Email ${email} is already registered.` });
        }

        const newEmployee = new companyModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'employee',
        });

        await newEmployee.save();

        res.status(201).json({
            success: true,
            message: `Employee ${firstName} ${lastName} registered successfully in ${collectionName}.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    registerEmployee
}