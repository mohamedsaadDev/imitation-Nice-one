const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersControllers')
const veryfiytoken = require('../middleware/veryfiytoken')
router.route('/')
    .get(userController.getAllusers)
router.route('/:userId')
    .delete(userController.deletUser)
router.route('/register')
    .post(userController.register)
router.route('/login')
    .post(userController.login)
module.exports = router