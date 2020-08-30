const routes =  require('express').Router()
const passport = require('./config/passport')

const UserController = require('./controllers/UserController')
const isAuthenticated = require('./middleware/isAuthenticated')
const isUnauthenticated = require('./middleware/isUnauthenticated')

// User Routes
routes.get('/users',UserController.index)
routes.get('/',isAuthenticated,UserController.home_view)
routes.get('/login',isUnauthenticated,UserController.login_view)
routes.post('/login',isUnauthenticated,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),UserController.login)
routes.get('/register',isUnauthenticated,UserController.register_view)
routes.post('/register',isUnauthenticated,UserController.register)
routes.get('/logout',isAuthenticated,UserController.logout)

module.exports = routes