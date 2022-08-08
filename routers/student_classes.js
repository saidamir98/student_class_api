const express = require('express')

const router = express.Router()

let inMemoryData = {
    student_classes: [
        {
            student_id: 1,
            class_id: 102,
            joined_at: new Date(),
        },
        {
            student_id: 1,
            class_id: 101,
            joined_at: new Date(),
        },
        {
            student_id: 3,
            class_id: 103,
            joined_at: new Date(),
        }
    ],
}

router.post('/student_class/:sid/:cid', (req, res)=> {
    let student_id = parseInt(req.params.sid)
    let class_id = parseInt(req.params.cid)

    if (!student_id) {
        res.status(400).send("student_id is required");
        return
    }

    if (!class_id) {
        res.status(400).send("class_id is required");
        return
    }

    for (let i = 0; i < inMemoryData.student_classes.length; i++) {
        const element = inMemoryData.student_classes[i];
        if (element.student_id == student_id && element.class_id == class_id) {
            res.status(400).send(`student_id:${student_id} already has been joined to the class of class_id:${class_id}!`);
            return
        }
    }

    inMemoryData.student_classes.push({
        student_id: student_id,
        class_id: class_id,
        joined_at: new Date()
    })

    res.status(201).send("successfully created")
})

router.delete('/student_class/:sid/:cid', (req, res)=> {
    let student_id = parseInt(req.params.sid)
    let class_id = parseInt(req.params.cid)

    if (!student_id) {
        res.status(400).send("student_id is required");
        return
    }

    if (!class_id) {
        res.status(400).send("class_id is required");
        return
    }

    let studentClass = inMemoryData.student_classes.find(e => e.student_id == student_id && e.class_id == class_id )
    if (!studentClass) {
        res.status(400).send(`student_id:${student_id} doesn't have the class of class_id:${class_id}!`);
        return
    }

    inMemoryData.student_classes = inMemoryData.student_classes.filter(e => e.student_id != student_id || e.class_id != class_id)

    res.status(200).send("successfully deleted")
})

router.get('/student_class', (req, res)=> {
    res.json(inMemoryData.student_classes)
})

module.exports = router