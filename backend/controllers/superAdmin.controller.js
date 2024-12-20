const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const companySchema = require('../models/company.schema')
const mongoose = require('mongoose')


const registerAdmin = async (req, res) => {
    try {


        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware
        const companyName = req.headers['company-name']; // modelName passed from middleware

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
            role: 'super_admin'
        })

        newAdmin.save()
        res.status(200).json({success: true, message: `new super admin ${lastName}, registered successfully`})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}




const viewAdmins = async (req, res) => {
    try {

        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware

        const collectionName = `${companyId}_${modelName}`


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

        
        const allAdmin = await companyModel.find()
        res.json(allAdmin)


    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


const viewAdmin = async (req, res) => {
    try {

        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware

        const collectionName = `${companyId}_${modelName}`


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

        
        const admin = await companyModel.findOne({_id: req.params.id})
        res.json(admin)


    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


const updateAdmin = async (req, res) => {
    try {

        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware

        const collectionName = `${companyId}_${modelName}`


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

        
        const updateAdmin = await companyModel.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.json(updateAdmin)


    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteAdmin = async (req, res) => {
    try {

        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']; // modelName passed from middleware

        const collectionName = `${companyId}_${modelName}`


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

        
       await companyModel.findOneAndDelete({_id: req.params.id})
        res.json({message: "Super admin deleted successfully"})


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



// view companies that registered in all the collections
const viewCompany = async (req, res) => {
    try {


        const companyId = req.headers['x-company-id']; // tenantId passed from middleware
        const modelName = req.headers['x-company-name']?.split(" ")[0]; // modelName passed from middleware

        const collectionName = `${companyId}_${modelName}`


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
        
        const allCompany = await companyModel.find()
        res.json(allCompany)


    } catch (error) {
        res.status(400).json({message: error.message})
    }
}



module.exports = {
    registerAdmin,
    viewAdmins,
    viewAdmin,
    updateAdmin,
    deleteAdmin,
    registerCompany,
    viewCompany
}