const express = require('express')
const router = express.Router()
const {register, login, logout, verify} = require('../controllers/auth.controller')
const tenantMiddleware = require('../middlewares/tenantMidleware')
const tenantMiddlewareLogin = require('../middlewares/tenantMiddlewareLogin')
const verifyUserMiddleware = require('../middlewares/authMiddleware')



router.post('/register', tenantMiddleware, register) // the middleware create collection dynamically
router.post('/login', tenantMiddlewareLogin, login) // the middleware verify the header so you can login to your collection
router.get('/verify', tenantMiddlewareLogin, verifyUserMiddleware, verify) // the middleware verify your token for subsequent request after login in 
router.post('/logout', logout)



module.exports = router