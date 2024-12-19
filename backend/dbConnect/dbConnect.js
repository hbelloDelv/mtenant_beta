const mongoose = require('mongoose')

const dbConnect = async() => {
    try {     
        const conn = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Database connected ${conn.connection.host}`)
    } catch (error) {
        console.log({error: error.message})
        exit(1)
    }
}

module.exports = dbConnect