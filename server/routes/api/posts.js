/* Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020*/

/* bibliotek som ska importeras */
const express = require("express");
const mongodb = require("mongodb");

/* skapar routern via express */
const router = express.Router();

/* REST-api för poster */
// hämta alla poster
router.get('/', async(req, res) => {
    const Posts = await loadPostCollection();
    res.send(await Posts.find({}).toArray());
});

// hämta en specifik post
router.get('/:id', async(req, res) => {
    const Posts = await loadPostCollection();
    res.send(await Posts.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray());
});

// lägg till poster
router.post('/', async(req, res) => {
    const Posts = await loadPostCollection();
    await Posts.insertOne({
        name: req.body.name,
        week: req.body.week,
        day: req.body.day,
        from: req.body.from,
        to: req.body.to,
        place: req.body.place
    });
    res.status(201).send();
});

// ta bort en specifik post
router.delete('/:id', async(req, res) => {
    const Posts = await loadPostCollection();
    await Posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

// uppdatera en specifik post
router.patch('/:id', async(req, res) => {
    const Posts = await loadPostCollection();
    await Posts.updateOne({ _id: new mongodb.ObjectID(req.params.id) }, {
        $set: {
            name: req.body.name,
            week: req.body.week,
            day: req.body.day,
            from: req.body.from,
            to: req.body.to,
            place: req.body.place
        }
    });
    res.status(201).send();
});


// asynk-funktion som gör att klienten kan ansluta till db och collection i MongoDB Atlas
async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://frida:TzUIc6ge1EWbECzJ@cluster0.xterm.mongodb.net/dbReport?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('dbReport').collection('posts');
}
/* exportera routern */
module.exports = router;