const jwt = require('jsonwebtoken')
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



const viewEmployees = async (req, res) => {
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

        
        const allEmployee = await companyModel.find()
        res.json(allEmployee)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const viewEmployee = async (req, res) => {
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

        
        const employee = await companyModel.findOne({_id: req.params.id})
        res.json(employee)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateEmployee = async (req, res) => {
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
      
        const updateEmployee = await companyModel.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.json(updateEmployee)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteEmployee = async (req, res) => {
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

        await companyModel.findOneAndDelete({_id: req.params.id})
        res.json({message: "Employee deleted successfully"})


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    registerEmployee,
    viewEmployees,
     viewEmployee, 
    updateEmployee,
    deleteEmployee 
}