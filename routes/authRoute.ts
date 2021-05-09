import Express, { response } from "express";
const passport = require("passport")
const app = Express();
const router = Express.Router();

require("../services/authService");

app.use(passport.initialize());
app.use(passport.session());

router.route("/").get(
  passport.authenticate('google', { scope: ['profile'] }));

router.route("/failed").get(async (req, res) => {res.send("Failed")})

router.route("/success").get(async (req, res) => {res.send(`welcome`)})

router.route("/callback").get( 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("success")
    res.redirect('/success');
  });

module.exports = router;