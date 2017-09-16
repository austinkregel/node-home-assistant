let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.set('view engine', 'ejs');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/associate', function (req, res) {
    Head.Brain.associate(
        req.body.intent,
        req.body.words,
        (req.body.callback)
    )
    return res.send({message: 'Intent built'})
})

app.get('/can-you', function (req, res) {
    "use strict";
    global.IS_MESSAGE_TEXT = true;
    console.log(req)
    return res.send({message: Head.Brain.canYou(req.query.q)});
})

app.get('/', function (req, res) {
    res.send({message: 'Welcome to the homepage'})
});



app.listen(3000, function () {
    "use strict";
    new Head.Ears((results) => {
        "use strict";
        global.IS_MESSAGE_TEXT = false;
        Log.alert(Head.Brain.canYou(results))
    });
})
