const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport){
    //funtion to authemticate users
    const authemticateUsers = async(email, password, done) =>{
        // get users by email
        const user = getUserByEmail(email)
        if(user ==  null){
            return done(null, false, {message: "No user found with this email"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
        } catch(e){
            console.log(e);
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize