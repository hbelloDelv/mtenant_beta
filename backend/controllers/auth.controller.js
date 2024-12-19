const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const companySchema = require('../models/company.schema')
// const createCollection = require('../lib/dynamicModel')
const mongoose = require('mongoose')


const register = async (req, res) => {
    try {

        const companyId = req.companyId; // tenantId passed from middleware
        const modelName = req.modelName; // modelName passed from middleware


        const {firstName, lastName, email, password, role, companyName, status} = req.body
       

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds); // Generate the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const collectionName = `${companyId}_${modelName}`;
        const companyModel = mongoose.models[collectionName] 
            || mongoose.model(collectionName, companySchema, collectionName);

       
        // Check if the company already exists
        // const existingCompany = await companyModel.findOne({ companyName });
        // if (existingCompany) {
        //     return res.status(400).json({ message: `Company with name ${companyName} already exists.` });
        // }

        const existingEmail = await companyModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: `Email ${email} is already registered.` });
        }
        
        const newCompany = await new companyModel({
            companyName, 
            firstName, 
            lastName, 
            email, 
            password:  hashedPassword,
            role,
        })

        newCompany.save()
        res.status(200).json({message: `new admin ${lastName}, registered successfully`})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


const login = async (req, res) => {
    try {
        const collectionName = req.modelName.trim(); // Sanitize model name
      
        // Check if the model exists
        let companyModel = mongoose.models[collectionName];
        if (!companyModel) {
            // Check if the collection exists in MongoDB
            const collections = await mongoose.connection.db.listCollections().toArray();
            const collectionExists = collections.some(col => col.name === collectionName);

            if (!collectionExists) {
                return res.status(404).json({ message: 'User not available' });
            }

            // Dynamically register the model
            companyModel = mongoose.model(collectionName, companySchema, collectionName);
        }

        // Extract login credentials
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await companyModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { email: user.email, role: user.role, modelName: collectionName },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            token,
            user: { email: user.email, name: user.lastName, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}


const logout = async (req, res) => {
    try {
        res.send('logout')
    } catch (error) {
        
    }
}


module.exports = {
    register,
    login,
    verify,
    logout
}