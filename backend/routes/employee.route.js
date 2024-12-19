const express = require('express')
const router = express.Router()
const {registerClient} = require('../controllers/employee.controller')
const {verifyEmployee} = require('../middlewares/employeeMiddleware')



router.post('/register/client', verifyEmployee, registerClient)
router.get('/view/client', verifyEmployee, registerClient)
router.put('/update/client', verifyEmployee, registerClient)
router.delete('/register/client', verifyEmployee, registerClient)


module.exports = router