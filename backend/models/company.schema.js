const mongoose = require('mongoose')


const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'employee', 'user']
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    collectionName: {
        type: String,
    },
    
},{timestamps: true})



module.exports = companySchema