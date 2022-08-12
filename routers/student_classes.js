const express = require('express')

const router = express.Router()

let db = require('./../db/data.js')

router.post('/student_class/:sid/:cid', (req, res)=> {
    let student_id = parseInt(req.params.sid)
    let class_id = parseInt(req.params.cid)

    let data = db.readData()

    if (!student_id) {
        res.status(400).send("student_id is required");
        return
    }

    if (!class_id) {
        res.status(400).send("class_id is required");
        return
    }

    for (let i = 0; i < data.student_classes.length; i++) {
        const element = data.student_classes[i];
        if (element.student_id == student_id && element.class_id == class_id) {
            res.status(400).send(`student_id:${student_id} already has been joined to the class of class_id:${class_id}!`);
            return
        }
    }

    data.student_classes.push({
        student_id: student_id,
        class_id: class_id,
        joined_at: new Date()
    })

    db.writeData(data)
    
    res.status(201).send("successfully created")
})

router.delete('/student_class/:sid/:cid', (req, res)=> {
    let student_id = parseInt(req.params.sid)
    let class_id = parseInt(req.params.cid)

    let data=db.readData()

    if (!student_id) {
        res.status(400).send("student_id is required");
        return
    }

    if (!class_id) {
        res.status(400).send("class_id is required");
        return
    }

    let studentClass = data.student_classes.find(e => e.student_id == student_id && e.class_id == class_id )
    if (!studentClass) {
        res.status(400).send(`student_id:${student_id} doesn't have the class of class_id:${class_id}!`);
        return
    }

    data.student_classes = data.student_classes.filter(e => e.student_id != student_id || e.class_id != class_id)
    db.writeData(data)

    res.status(200).send("successfully deleted")
})

router.get('/student_class/:sid', (req, res)=> {
    let student_id = parseInt(req.params.sid)
    
    let student = db.readData().students.find(e => e.id == student_id)

    if (!student) {
        res.status(400).send("student not found");
        return
    }

    let studentClassList = db.readData().student_classes.filter(e => e.student_id == student.id)
    if (!studentClassList.length) {
        res.status(400).send(`student_id:${student_id} doesn't have classes`);
        return
    }
    
    studentClassList.forEach(e => {
        for (let i = 0; i < db.readData().classes.length; i++) {
            if (e.class_id == db.readData().classes[i].id) {
                e.class = db.readData().classes[i]
                break
            }
        }
    });

    res.json({classes: studentClassList, student: student})
})

router.get('/class_student/:cid', (req, res)=> {
    let class_id = parseInt(req.params.cid)
    
    let classItem = db.readData().classes.find(e => e.id == class_id)

    if (!classItem) {
        res.status(400).send("class not found");
        return
    }

    let studentClassList = db.readData().student_classes.filter(e => e.class_id == classItem.id)
    if (!studentClassList.length) {
        res.status(400).send(`class_id:${class_id} doesn't have classes`);
        return
    }
    
    studentClassList.forEach(e => {
        for (let i = 0; i < db.readData().students.length; i++) {
            if (e.student_id == db.readData().students[i].id) {
                e.student = db.readData().students[i]
                break
            }
        }
    });

    res.json({students: studentClassList, class: classItem})
})

module.exports = router