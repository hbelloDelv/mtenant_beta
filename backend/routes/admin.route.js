const express = require('express')
const router = express.Router()
const {verifyAdmin} = require('../middlewares/adminMiddleware')
const {
    registerEmployee,
    viewEmployees,    
    viewEmployee, 
    updateEmployee,
    deleteEmployee   
} = require('../controllers/admin.controller')



router.post('/register/employee', verifyAdmin, registerEmployee)
router.get('/view/employees', verifyAdmin, viewEmployees)
router.get('/view/employee/:id', verifyAdmin, viewEmployee)
router.put('/update/employee/:id', verifyAdmin, updateEmployee)
router.delete('/delete/employee/:id', verifyAdmin, deleteEmployee)


module.exports = router