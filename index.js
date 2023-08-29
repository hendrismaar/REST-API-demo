const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const songs = [
    { id: 1, name: "Screams from the Disemboweled",  artist: "Artery Eruption"},
    { id: 2, name: "Domination", artist: "Pantera"},
    { id: 3, name: "The Pig", artist: "Torsofun"},
    { id: 4, name: "Adorned with Melting Plastic", artist: "Metrorraghia"},
]
// Songs
app.get('/songs', (req, res) => {
    res.send(songs)
})

app.get('/songs/:id', (req, res) =>{
    if( typeof songs[req.params.id -1] === 'undefined') {
        return res.status(404).send({ error: "Requested song not found"})
    }
res.send(songs[req.params.id - 1])
})

app.post('/songs', (req, res) => {
    if (!req.body.name || !req.body.artist) {
        return res.status(400).send({ error: 'One or all params are missing'})
    }
    let newSong = {
        id: songs.length + 1,
        name: req.body.name,
        artist: req.body.artist
    }
    songs.push(newSong)
    res.status(201).location('localhost:8080/songs/' + (songs.length - 1)).send(newSong)
})

// Widgets
app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    const getIndex = widgets.findIndex(w=>w.id === parseInt(req.params.id))
    if (getIndex === -1) {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widgets[req.params.id - 1])
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    const newId = Math.max(...widgets.map((widget)=> widget.id)) + 1
    console.log(newId)
    let newWidget = {
        id: newId,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + (newId)).send(
        newWidget
    )
})

app.delete('/widgets/:id', (req, res) => {
    const deleteIndex = widgets.findIndex(w=>w.id === parseInt(req.params.id))
    if ( deleteIndex === -1) {
        return res.status(404).send({ error: "Widget not found"})
    }
    widgets.splice(req.params.id - 1, 1)
    res.status(204).send()
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})
