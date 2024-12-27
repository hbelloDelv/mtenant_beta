const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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




// const viewClients = async (req, res) => {
//     try {
//         const collectionName = req.collectionName; // Access collectionName from middleware

//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.status(404).json({ success: false, error: "Token not provided" });
//         }

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         if (!decoded) {
//             return res.status(404).json({ success: false, error: "Token not valid" });
//         }

//         // Check if the collection exists in MongoDB
//         const collections = await mongoose.connection.db.listCollections().toArray();
//         const collectionExists = collections.some(col => col.name === collectionName);

//         if (!collectionExists) {
//             return res.status(404).json({ success: false, error: "Collection does not exist" });
//         }

//         const companyModel = mongoose.model(collectionName, companySchema, collectionName);

//         const email = decoded.email;
//         if (!email) {
//             return res.status(400).json({ success: false, error: "Email not found in token" });
//         }

//         // Check if the user exists
//         const user = await companyModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         // Fetch all employees with role 'client'
//         const clients = await companyModel.find({ role: "client" });

//         res.json( clients);
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
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

        const role = decoded.role; // Extract the user's role from the token
        const email = decoded.email;

        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        // Check if the collection exists in MongoDB
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === collectionName);

        if (!collectionExists) {
            return res.status(404).json({ success: false, error: "Collection does not exist" });
        }

        const companyModel = mongoose.model(collectionName, companySchema, collectionName);

        // Check if the user exists
        const user = await companyModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Fetch all clients with role "client", excluding fields based on user's role
        const clients = await companyModel.find({ role: "client" }).select(
            role === 'employee'
                ? '-landStatus -plotId' // Exclude these fields for employees
                : '' // Include all fields for other roles
        );

        if (!clients.length) {
            return res.status(404).json({ success: false, error: "No clients found" });
        }

        res.json(clients);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





const viewClient = async (req, res) => {
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

        const role = decoded.role; // Extract the user's role from the token
        const email = decoded.email;

        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        // Check if the collection exists in MongoDB
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === collectionName);

        if (!collectionExists) {
            return res.status(404).json({ success: false, error: "Collection does not exist" });
        }

        const companyModel = mongoose.model(collectionName, companySchema, collectionName);

        // Check if the user exists
        const user = await companyModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Fetch the client by ID
        const client = await companyModel.findOne({ _id: req.params.id }).select(
            role === 'employee'
                ? '-landStatus -plotId' // Exclude these fields for employees
                : '' // Include all fields for other roles
        );

        if (!client) {
            return res.status(404).json({ success: false, error: "Client not found" });
        }

        res.json(client);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// const updateClient = async (req, res) => {
//     try {
//         const collectionName = req.collectionName;

//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(404).json({ success: false, error: "Token not provided" });
//         }

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         if (!decoded) {
//             return res.status(404).json({ success: false, error: "Token not valid" });
//         }

//         const collections = await mongoose.connection.db.listCollections().toArray();
//         const collectionExists = collections.some(col => col.name === collectionName);

//         if (!collectionExists) {
//             return res.status(404).json({ success: false, error: "Collection does not exist" });
//         }

//         const companyModel = mongoose.model(collectionName, companySchema, collectionName);

//         const email = decoded.email;
//         if (!email) {
//             return res.status(400).json({ success: false, error: "Email not found in token" });
//         }

//         const user = await companyModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         const { password, newPassword } = req.body;

//         if (!password || !newPassword) {
//             return res.status(400).json({ success: false, error: "Password and new password are required" });
//         }


//         if (!user.password) {
//             console.error("Error: user.password is missing");
//             return res.status(500).json({ success: false, error: "Invalid user data" });
//         }

//         try {
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (!isPasswordValid) {
//                 return res.status(400).json({ success: false, error: "Current password is incorrect" });
//             }
//         } catch (error) {

//             return res.status(500).json({ success: false, error: "Internal server error" });
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//         await companyModel.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: { ...req.body, password: hashedNewPassword } },
//             { new: true }
//         );

//         res.json({ success: true, message: 'Record updated successfully' });
//     } catch (error) {
//         console.error("Error in updateClient:", error.message);
//         res.status(400).json({ message: error.message });
//     }
// };


const updateClient = async (req, res) => {
    try {
        const collectionName = req.collectionName;

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token not valid" });
        }

        const role = decoded.role; // Assuming the token contains the user's role
        const email = decoded.email;

        if (!email) {
            return res.status(400).json({ success: false, error: "Email not found in token" });
        }

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === collectionName);

        if (!collectionExists) {
            return res.status(404).json({ success: false, error: "Collection does not exist" });
        }

        const companyModel = mongoose.model(collectionName, companySchema, collectionName);

        const user = await companyModel.findOne({ email }).select(
            role === 'employee' 
                ? '-landStatus -plotId' // Exclude these fields for employees
                : '' // Include all fields for other roles
        );

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({ success: false, error: "Password and new password are required" });
        }

        if (!user.password) {
            console.error("Error: user.password is missing");
            return res.status(500).json({ success: false, error: "Invalid user data" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Current password is incorrect" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

              await companyModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body, password: hashedNewPassword } },
            { new: true }
        ).select(
            role === 'employee' 
                ? '-landStatus -plotId' // Exclude these fields for employees in the updated data
                : '' // Include all fields for other roles
        );

        res.json({ success: true, message: 'Record updated successfully'});
    } catch (error) {
        console.error("Error in updateClient:", error.message);
        res.status(400).json({ message: error.message });
    }
};





module.exports = {
    registerClient,
    viewClients,
    viewClient,
    updateClient
}