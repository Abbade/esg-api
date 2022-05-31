const { authSecret } = require('../.env')
const db = require('../config/db')
const passport = require('passport')
const passportJwt = require('passport-jwt')
require('dotenv').config();

const { Strategy, ExtractJwt } = passportJwt


const params = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const  strategy = new Strategy(params, async (payload, done) => {
    try {
        var row = await db.query('select id, email from userSystem where id = $1', [payload.id]);
        let user = row[0];
        if (user) {
            done(null, { id: user.id, email: user.email })
        } else {
            done(null, false)
        }
    } catch (error) {
        done(error, false)
    }
 

})

passport.use(strategy)


module.exports =  {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false })       
}

