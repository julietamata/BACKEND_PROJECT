import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.model.js";
import { isValidPassword, createHash } from "../utils.js";
import GitHubStrategy from 'passport-github2'


const LocalStrategy = local.Strategy


const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await usersModel.findOne({ email: username })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }

            const newUser = {
                first_name, last_name, email, age, password: createHash(password)
            }
            const result = await usersModel.create(newUser)
            return done(null, result)
        } catch(err) {
            return done('error al obtener el user')
        }
    }))



    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.c84585be45f2ebf4',
        clientSecret: '7bdb7503881ee95f7d91de95e7483fd26202a847',
        callbackURL: 'http://localhost:8080/session/githubcallback'
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try{
            const user = await usersModel.findOne({ email: profile._json.email })
            if (user) return done(null, user)
            const newUser = await usersModel.create({
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                password: ""
            })
            return done(null, newUser)
        } catch(err){
            return done( `Error to login with Github => ${err.messsage} `)
        }
    }
    ))


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




// http://localhost:8080/api/session/githubcallback
// Client ID: Iv1.c84585be45f2ebf4
// 7bdb7503881ee95f7d91de95e7483fd26202a847