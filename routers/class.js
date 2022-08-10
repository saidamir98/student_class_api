const express = require('express')

const router = express.Router()

let db = require('./../db/data.js')

router.post('/', (req, res) => {
    let body = req.body

    if (!body.title) {
        res.status(400).send("title field is required");
        return
    }

    for (let i = 0; i < db.readData().classes.length; i++) {
        const element = db.readData().classes[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} class exists`);
            return
        }
    }

    body.created_at = new Date()

    let data = db.readData()
    data.classes.push(body)
    db.writeData(data)

    res.status(201).send("successfully created")
})

router.get('/', (req, res) => {
    let search = req.query.search

    if (!search) {
        search = ""
    }

    let list = db.readData().classes.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("classes resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id

    let contact = db.readData().classes.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} class doesn't exist`);
        return
    }

    res.status(200).json(contact)
})

router.put('/', (req, res) => {
    let body = req.body
    let data = db.readData()


    let contact = data.classes.find(e => e.id == body.id)

    if (!contact) {
        res.status(400).send(`id:${body.id} class doesn't exist!`);
        return
    }

    for (let i = 0; i < data.classes.length; i++) {
        const element = data.classes[i];
        if (element.id == body.id) {
            body.created_at = data.classes[i].created_at
            body.updated_at = new Date()
            data.classes[i] = body
            break;
        }
    }

    db.writeData(data)

    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    let contact = db.readData().classes.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} class doesn't exist!`);
        return
    }

    let data = db.readData()
    data.classes = data.classes.filter(e => e.id != id)
    db.writeData(data)

    res.status(200).send("successfully deleted")
})

module.exports = {router}