const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const companySchema = require('../models/company.schema')
// const createCollection = require('../lib/dynamicModel')
const mongoose = require('mongoose')


const registerAdmin = async (req, res) => {
    try {


        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware
        const companyName = req.headers['company-name']; // modelName passed from middleware
        const role = req.headers['role']; // modelName passed from middleware

        const {firstName, lastName, email, password, confirmPassword } = req.body
       
        if(password !== confirmPassword){
            return res.status(400).json({ message: `password not matched` });
        }

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds); // Generate the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const collectionName = `${companyId}_${modelName}`;
        const companyModel = mongoose.models[collectionName] 
            || mongoose.model(collectionName, companySchema, collectionName);


        const existingEmail = await companyModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: `Email ${email} is already registered.` });
        }
        
        const newAdmin = await new companyModel({
            companyName, 
            firstName, 
            lastName, 
            email, 
            password:  hashedPassword,
            role,
        })

        newAdmin.save()
        res.status(200).json({success: true, message: `new super admin ${lastName}, registered successfully`})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}



const registerCompany = async (req, res) => {
    try {


        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']?.split(" ")[0]; // modelName passed from middleware

        const role = req.headers['role']; // modelName passed from middleware

        const {firstName, lastName, email, password, confirmPassword, companyName } = req.body
       
        if(password !== confirmPassword){
            return res.status(400).json({ message: `password not matched` });
        }

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds); // Generate the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const collectionName = `${modelName}_${companyId}`;
        const companyModel = mongoose.models[collectionName] 
            || mongoose.model(collectionName, companySchema, collectionName);


        const existingEmail = await companyModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({message: `Email ${email} is already registered.` });
        }
        
        const newCompany = await new companyModel({
            companyName, 
            firstName, 
            lastName, 
            email, 
            password:  hashedPassword,
            role,
            collectionName
        })

        newCompany.save()
        res.status(200).json({success: true, message: `New admin ${lastName} for ${companyName},  Company ID: ${collectionName} registered successfully,`})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}



module.exports = {
    registerAdmin,
    registerCompany
}