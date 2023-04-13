const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./user.model");

module.exports = (passport) => {
        passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/users/auth/google/callback",
            passReqToCallback : true
          },
          async (request, accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await User.findOne({ 'googleID': profile.id });
                if (existingUser) {
                console.log("user already exists")
                              return done(null, existingUser);
                }
                console.log('Creating new user...');
                const newUser = new User({
                    googleID: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    first_name: profile.given_name,
                    last_name: profile.family_name
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
          }
        ));
    passport.serializeUser(function(user, done) {
        done(null, user)
    })
    
    passport.deserializeUser(function(user, done) {
        done(null, user)
    })
}
