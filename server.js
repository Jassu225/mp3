const path = require("path");
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const util = require("util");
// const NedbStore = require('nedb-session-store')(session);
// const cookieParser = require('cookie-parser');
// const config = require('./config');
// const routes = require('./routes');
// const Authentication = require("./authentication");
const port = process.env.PORT || 7881;
// const sharedSecretKey = "3d8700d44aeeb29892a6a30c5ee78e08";

// let sessionCookie = {
//     cookie: {
//         secure: false
//     },
//     secret: sharedSecretKey,
//     resave: true,
//     saveUninitialized: true,
//     store: new NedbStore({
//         filename: path.join(__dirname, "../../data/dataStore.db")
//     })
// }

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sessionCookie.cookie.secure = true // serve secure cookies
// }
// console.log(__dirname);
// app.use(cookieParser(sharedSecretKey));
// app.use(session(sessionCookie));
// app.use(Authentication);
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
// app.use("/css/",express.static(path.join(__dirname, "../client","/css")));
// app.use("/js/",express.static(path.join(__dirname, "../client", "/js")));

// function resetGameState(req) {
//     req.session.gameState = [["","",""],["","",""],["","",""]];
//     req.session.save();
// }

// console.log(path.join(__dirname + "/dist/"));

app.use('/dist',express.static(path.join(__dirname + "/dist/")));
app.use('/src',express.static(path.join(__dirname + "/src/")));
// app.use('/images/',express.static(__dirname + "./src/assets/images/"));
// GET Methods
app.get("/", function(req, res) { 
    // init session cookie
    // resetGameState(req);
    // send root
    res.sendFile(path.join(__dirname, "./index.html"));
});

// POST Methods


app.listen(port, () => console.log(`Example app listening on port ${port}!`));