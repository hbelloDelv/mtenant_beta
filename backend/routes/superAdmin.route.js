const express = require('express')
const router = express.Router()
const {
        registerAdmin, 
        registerCompany, 
        viewAdmins,
        viewAdmin,
        updateAdmin,
        deleteAdmin,
        viewAdminsFromAllCollections
} = require('../controllers/superAdmin.controller')



router.post('/register/admin', registerAdmin)
router.get('/view/admins', viewAdmins)
router.get('/view/admin/:id', viewAdmin)
router.put('/update/admin/:id', updateAdmin)
router.delete('/delete/admin/:id', deleteAdmin)
router.post('/register/company', registerCompany)
router.get('/view/company/admins', viewAdminsFromAllCollections)


module.exports = router