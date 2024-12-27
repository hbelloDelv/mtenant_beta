const express = require('express')
const router = express.Router()
const {verifyEmployee} = require('../middlewares/employeeMiddleware')
const {
        registerClient,
        viewClients,
        viewClient,
        updateClient
    } = require('../controllers/employee.controller')



router.post('/register/client', verifyEmployee, registerClient)
router.get('/view/clients', verifyEmployee, viewClients)
router.get('/view/client/:id', verifyEmployee, viewClient)
router.put('/update/client/:id', verifyEmployee, updateClient)
router.delete('/register/client', verifyEmployee, registerClient)


module.exports = router