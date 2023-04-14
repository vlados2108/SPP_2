const Router = require('express')
const router = new Router()
const controller = require('./authController');
const {check} = require('express-validator')

router.post('/registration',[
    check('username',"Username can't be empty").notEmpty(),
    check('password',"Password must have at least 4 symbols, but less then 10").isLength({min:4,max:10})
],controller.registration)
router.post('/login',controller.login)
router.get('/users',controller.getUsers)

module.exports = router