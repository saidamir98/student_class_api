const PORT = 3000;

const express = require('express')

const app = express()

app.use(express.json())

const loggerMiddeware = (req, res, next) => {
    let d = new Date,
        dformat = [d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
    next()
    let diff = new Date() - d
    console.log(`--------> ${dformat} | ${req.method}: ${req.url} | ${diff} ms`)
}

app.use('/', loggerMiddeware)

app.get('/', (req, res) => {
    res.send("server is running")
})

const studentRouter = require('./routers/student')
const classRouter = require('./routers/class')
const studentClassesRouter = require('./routers/student_classes')

app.use('/student', studentRouter.router)
app.use('/class', classRouter.router)
app.use(studentClassesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})