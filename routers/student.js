const express = require('express')

const router = express.Router()

let inMemoryData = {
    students:[
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 2,
            name: "Steve Jobs",
            email: "steve.jobs@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 3,
            name: "Bill Gates",
            email: "bill.gates@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ]
}

router.post('/', (req, res) => {
    let body = req.body

    if (!body.name) {
        res.status(400).send("name field is required");
        return
    }

    if (!body.email) {
        res.status(400).send("email field is required");
        return
    }

    for (let i = 0; i < inMemoryData.students.length; i++) {
        const element = inMemoryData.students[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} student exists`);
            return
        }
    }

    body.created_at = new Date()
    inMemoryData.students.push(body)

    res.status(201).send("successfully created")
})

router.get('/', (req, res) => {
    let search = req.query.search

    if (!search) {
        search = ""
    }

    let list = inMemoryData.students.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("students resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.students.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist`);
        return
    }

    res.status(200).json(contact)
})

router.put('/', (req, res) => {
    let body = req.body

    let contact = inMemoryData.students.find(e => e.id == body.id)

    if (!contact) {
        res.status(400).send(`id:${body.id} student doesn't exist!`);
        return
    }

    for (let i = 0; i < inMemoryData.students.length; i++) {
        const element = inMemoryData.students[i];
        if (element.id == body.id) {
            body.created_at = inMemoryData.students[i].created_at
            body.updated_at = new Date()
            inMemoryData.students[i] = body
            break;
        }
    }

    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.students.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist!`);
        return
    }

    inMemoryData.students = inMemoryData.students.filter(e => e.id != id)

    res.status(200).send("successfully deleted")
})

module.exports = router