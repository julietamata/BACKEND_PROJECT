import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.model.js";
import { isValidPassword, createHash } from "../utils.js";


const LocalStrategy = local.Strategy


const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await UserModel.findOne({ email: username })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }

            const newUser = {
                first_name, last_name, email, age, password: createHash(password)
            }
            const result = await UserModel.create(newUser)
            return done(null, result)
        } catch(err) {
            return done('error al obtener el user')
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id)
        done(null, user)
    })



    passport.use('login', new LocalStrategy({
     usernameField: 'email'
    }, async(username, password, done) => {
        try{
            const user = await usersModel.findOne({ email: username})
        if (!user) {
            return done(null, false)
        }
        if(!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch(err){

     }
    })
    )


}

export default initializePassport