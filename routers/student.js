const express = require('express')

const router = express.Router()

let db = require('./../db/data.js')

router.post('/', (req, res) => {
    let body = req.body
    let data =  db.readData()
    if (!body.name) {
        res.status(400).send("name field is required");
        return
    }

    if (!body.email) {
        res.status(400).send("email field is required");
        return
    }

    for (let i = 0; i < data.students.length; i++) {
        const element = data.students[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} student exists`);
            return
        }
    }

    body.created_at = new Date()
    data.students.push(body)
    db.writeData(data)

    res.status(201).send("successfully created")
})

router.get('/', (req, res) => {
    let data =  db.readData()
    let search = req.query.search

    if (!search) {
        search = ""
    }

    let list = data.students.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("students resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let data =  db.readData()
    let contact = data.students.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist`);
        return
    }

    res.status(200).json(contact)
})

router.put('/', (req, res) => {
    let data =  db.readData()
    let body = req.body

    let contact = data.students.find(e => e.id == body.id)

    if (!contact) {
        res.status(400).send(`id:${body.id} student doesn't exist!`);
        return
    }

    for (let i = 0; i < data.students.length; i++) {
        const element = data.students[i];
        if (element.id == body.id) {
            body.created_at = data.students[i].created_at
            body.updated_at = new Date()
            data.students[i] = body
            break;
        }
    }

    db.writeData(data)
    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let data =  db.readData()

    let contact = data.students.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist!`);
        return
    }
   
    data.students = data.students.filter(e => e.id != id)
    db.writeData(data)

    res.status(200).send("successfully deleted")
})

module.exports = {router}