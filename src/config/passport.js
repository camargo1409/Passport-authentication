const passport = require('passport'),
Strategy = require('passport-local').Strategy
const connection = require('../database/connection')
const bcrypt = require('bcryptjs')

passport.use(new Strategy(
    async function(username,password,cb){
        const user = await connection('users').where('users.username',username)
        if(!user.length > 0){
            return cb(null,false,{message:"Invalid Username"})
        }
        if(!await bcrypt.compare(password,user[0].password)){
            return cb(null, false,{message:"Invalid Password"})
        }
        return cb(null,user)
    }
))

passport.serializeUser(function(user, cb) {
    cb(null, user[0].id);
  });
  
  passport.deserializeUser(async function(id, cb) {
      try {
        const user = await connection('users').where('users.id',id)
        if(!user.length > 0){
            return cb(null,false)
        }
        return cb(null,user)
      } catch (error) {
          return cb(error)
      }
    
  });


module.exports = passport