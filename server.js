const Nuxt = require('nuxt')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

var server = express();

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

passport.use(new FacebookStrategy({
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    let user = {
      'name': 'tom',
      'id': profile.id
    };

    // Verify or create a user in the database here
    // The user object we are about to return gets passed to the route's controller as `req.user`
    return done(null, user); 
  }
));

// For serving static files from public directory
// server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser());
server.use(session({
  secret: 'keyboard cat'
}));
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // You can verify user info with the database if you need to here
  done(null, user);
});

server.get('/auth/facebook', passport.authenticate('facebook'));

server.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
  successRedirect: '/',
  failureFlash: true
}));

server.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
new Nuxt(config)
  .then((nuxt) => {
    // nuxt middlware
    server.use(nuxt.render)
    // Build only in dev mode
    if (config.dev) {
      nuxt.build()
        .catch((error) => {
          console.error(error) // eslint-disable-line no-console
          process.exit(1)
        })
    }
    // Listen on the server
    server.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  })