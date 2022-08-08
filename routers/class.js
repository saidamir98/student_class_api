const express = require('express')

const router = express.Router()
let inMemoryData = {
    classes: [
        {
            id: 101,
            title: "Math",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 102,
            title: "Music",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 103,
            title: "IT",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ]
}

router.post('/', (req, res) => {
    let body = req.body

    if (!body.title) {
        res.status(400).send("title field is required");
        return
    }

    for (let i = 0; i < inMemoryData.classes.length; i++) {
        const element = inMemoryData.classes[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} class exists`);
            return
        }
    }

    body.created_at = new Date()
    inMemoryData.classes.push(body)

    res.status(201).send("successfully created")
})

router.get('/', (req, res) => {
    let search = req.query.search

    if (!search) {
        search = ""
    }

    let list = inMemoryData.classes.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("classes resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.classes.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} class doesn't exist`);
        return
    }

    res.status(200).json(contact)
})

router.put('/', (req, res) => {
    let body = req.body

    let contact = inMemoryData.classes.find(e => e.id == body.id)

    if (!contact) {
        res.status(400).send(`id:${body.id} class doesn't exist!`);
        return
    }

    for (let i = 0; i < inMemoryData.classes.length; i++) {
        const element = inMemoryData.classes[i];
        if (element.id == body.id) {
            body.created_at = inMemoryData.classes[i].created_at
            body.updated_at = new Date()
            inMemoryData.classes[i] = body
            break;
        }
    }

    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.classes.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} class doesn't exist!`);
        return
    }

    inMemoryData.classes = inMemoryData.classes.filter(e => e.id != id)

    res.status(200).send("successfully deleted")
})

module.exports = router