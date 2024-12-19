const express = require('express')
const router = express.Router()
const {registerAdmin, registerCompany} = require('../controllers/superAdmin.controller')



router.post('/register/admin', registerAdmin)
router.post('/register/company', registerCompany)


module.exports = router