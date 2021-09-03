const express = require('express');
const app = express();
const expressSession = require('express-session');
const cors = require('cors');
const routes = require('./api/1.0/routes');
const passport = require('passport');
const bodyParser = require('body-parser');
const googleStrategy = require('passport-google-oauth20').Strategy;
const permission = require('./permission').permissionMiddleWare;
const MongoStore = require('connect-mongo')(expressSession);
let database = require( './database');
let db = database.connect('mongodb://127.0.0.1:27017/cotg_management');

const G_KEY = 'gKey';
const G_SECRET = 'gSecret';
const G_CALLBACK = 'http://api.localhost/auth/google/callback';

// Server folder path.
global.$root_path = __dirname;
global.$api_path = __dirname + '/api/1.0';
global.$db_model_path = __dirname + '/database_models';
global._server_url = 'http://localhost';
global._api_server_url = 'http://api.localhost';

passport.use(new googleStrategy({
    clientID: G_KEY,
    clientSecret: G_SECRET,
    callbackURL: G_CALLBACK,
}, function(token, tokenSecret, profile, done){
    return done(null, profile);
}));

let corsOptions = {
    origin: 'http://localhost',
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb'}));

app.use(expressSession({
    secret: 'secrets',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null,
        secure: false,
    },
    store: new MongoStore({ url: 'mongodb://127.0.0.1:27017/cotg_management' })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost',
    methods: 'GET,HEAD,POST,PATCH,OPTIONS',
    credentials: true,
}))

app.use(permission);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

routes.passport = passport;
routes.bind(app);

app.listen(2800, () => {
    console.log('Server started at port 2800.');
});

let o = require('./test');
o();
