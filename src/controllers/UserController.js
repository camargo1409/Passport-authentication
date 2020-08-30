const connection = require('../database/connection')
const bcrypt = require('bcryptjs')


module.exports = {
    async index(req,res){
        const users = await connection('users')
        return res.send(users)
    },
    login_view(req,res){
        return res.render('login')
    },
    async login(req,res){
        return res.redirect('/')
    },
    register_view(req,res){
        return res.render('register')
    },
    async register(req,res){
        const {username,email,password} = req.body
        const usernameAlreadyExists = await connection('users').where('users.username',username)
        const emailAlreadyExists = await connection('users').where('users.email',email)
        if(usernameAlreadyExists.length > 0){
            res.locals.msg_error = "Username already exists"
            return res.render("register")
        }

        if(emailAlreadyExists.length > 0){
            res.locals.msg_error = "Email already exists"
            return res.render("register")
        }
        const hashedPassword = await bcrypt.hash(password,10)

        try {
            const user = await connection('users').insert({
                username,email,password:hashedPassword
            })
            return res.render("login")
        } catch (error) {
            return res.send(error)        
        }
    },
    home_view(req,res){      
        return res.render('home', { user: req.user[0] });
    },
    logout(req,res){
        req.logout()
        return res.redirect('/login')
    }
}