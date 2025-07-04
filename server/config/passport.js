require('dotenv').config();
const passport = require('passport');
const speakeasy = require('speakeasy');
const { User, Profile } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          const randomToken = speakeasy.totp({
            secret: speakeasy.generateSecret().base32,
            encoding: 'base32',
            digits: 4,
          });

          user = await User.create({
            username:
              profile.displayName.replace(/\s+/g, '').toLowerCase() +
              randomToken,
            email: profile.emails[0].value,
            password: null,
          });

          await Profile.create({
            userId: user.id,
            fullname: profile.displayName,
            avatar: profile.photos[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
