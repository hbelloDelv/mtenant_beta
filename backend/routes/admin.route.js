const express = require('express')
const router = express.Router()
const {registerEmployee} = require('../controllers/admin.controller')
const {verifyAdmin} = require('../middlewares/adminMiddleware')



router.post('/register/employee', verifyAdmin, registerEmployee)
router.get('/view/employee', verifyAdmin, registerEmployee)
router.put('/update/employee', verifyAdmin, registerEmployee)
router.delete('/register/employee', verifyAdmin, registerEmployee)


module.exports = router