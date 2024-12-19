const express = require('express')
const cors = require('cors')
const app = express()
const dotenv =  require('dotenv')
dotenv.config()
const dbConnect = require('./dbConnect/dbConnect')
dbConnect()

const authRouter = require('./routes/auth.route')
const superAdminRouter = require('./routes/superAdmin.route')
const adminRouter = require('./routes/admin.route')
const employeeRouter = require('./routes/employee.route')


app.use(cors())
app.use(express.json())
app.use('/admin/api/', authRouter)
app.use('/super/admin/api/', superAdminRouter)
app.use('/admin/api/', adminRouter)
app.use('/employee/api/', employeeRouter)




const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server started successfully ${PORT}`)
})

