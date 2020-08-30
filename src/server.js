const express = require('express')
const path = require('path')
const session = require('express-session')
const routes = require('./routes')
const passport = require('./config/passport')
const dotenv = require('dotenv').config()
const flash = require('express-flash')

app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(session({secret:process.env.APP_KEY,resave: false, saveUninitialized: false}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use('/static',express.static(path.join(__dirname,'public')))


app.use(routes)



app.listen(3001)