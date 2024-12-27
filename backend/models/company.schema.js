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
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'employee', 'client']
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    landStatus: {
        type: String,
        enum: ['sold', 'unsold', 'not for sale', 'null'],
        default: 'null'
    },
    plotId: {
        type: Number,
        default: 0
    },
    collectionName: {
        type: String,
    },
    
},{timestamps: true})



module.exports = companySchema