const express = require('express')
const router = express.Router()
const {verifyEmployee} = require('../middlewares/employeeMiddleware')
const {
        registerClient,
        viewClients,
    } = require('../controllers/employee.controller')



router.post('/register/client', verifyEmployee, registerClient)
router.get('/view/clients', verifyEmployee, viewClients)
router.put('/update/client', verifyEmployee, registerClient)
router.delete('/register/client', verifyEmployee, registerClient)


module.exports = router