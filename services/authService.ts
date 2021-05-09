import { models } from './databaseService';
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require("fs");

let rawData = fs.readFileSync("../Resources/EcomOAuth.json");
let jsonData = JSON.parse(rawData);


const GOOGLE_CLIENT_ID = jsonData[0].GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = jsonData[0].GOOGLE_CLIENT_SECRET;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
    /** 
    models.user.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
    */
  }
));
