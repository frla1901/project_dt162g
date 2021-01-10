/* Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020*/

/* bibliotek som ska importeras */
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

/* skapar instans av express biblioteket */
var app = express();

/* middelware för att göra webbtjänsterna tillgängliga även från andra domäner
att använda i framtiden */

app.all(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

/* Middleware för biblioteken */
app.use(bodyParser.json());
app.use(cors());

/* variabel för posts som hänvisar och länkar ihop index.js med posts.js */
var posts = require('./routes/api/posts.js');
app.use('/api/posts', posts);

// hantera production
if (process.env.NODE_ENV === 'production') {

    // statisk mapp som skall användas
    app.use(express.static(__dirname + '/public/'))

    // hantera SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}

// anslutningsport (Heroku eller port 3000)
var port = process.env.PORT || 3000;

// starta server 
app.listen(port, () =>
    console.log(`Servern är startad på port ${port}`));