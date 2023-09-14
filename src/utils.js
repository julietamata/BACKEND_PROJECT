import bcrypt from 'bcrypt'
import passport from 'passport'
import { Jwt } from 'jsonwebtoken'

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}



// export const passportCall = strategy => {
//     return async(req, res, next) => {
//         passport.authenticate(strategy, function(err, user, info) {
//             if (err) return next(err)
//             if (!user) return res.status(401).render('partials/errors', { error: 'Unauthorized' })
            
//             req.user = user
//             next()
//         })(req, res, next)
//     }
// }

// export const handlePolicies = policies => (req, res, next) => {
//     const user = req.user || null
//     console.log('handlePolicies: ', user)
//     if (policies.includes('ADMIN')) {
//         if (user.role !== 'admin') {
//             return res.status(403).render('partials/errors', {
//                 error: 'Please log in with your admin credentials'
//             })
//         }
//     }
//     return next()
// }




export const generateToken = user => {
    const token = Jwt.sign({user}, 'secret', { expiresIn: '24h'})
    return token
}

// export const authToken = (req, res, next) => {
//     const token = req.headers.auth
//     if (!token) return res.status(401).send( { error: 'Not auth'})
//     Jwt.verify(token, 'secret', (error, credentials) => {
// if (error) return res.status(403).send({error: 'Not authorized'})
//         req.user = credentials.user
//     next()
// })
// }