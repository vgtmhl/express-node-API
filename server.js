const express = require('express')
const cors = require('cors')
const path = require('path');
const res = require('express/lib/response');

const app = express();
const PORT = process.env.port || 3000;

const timeRoutes = require('./routes/time.js')
const nameRoutes = require('./routes/names.js')
const jsonRoutes = require('./routes/json.js')
const echoAllRoutes = require('./routes/echo-all.js')

/**
 * Middlewares
 */

// CORS
app.use(cors())
app.options("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-Requested-With");
    res.send(200)
})

// JSON: tells express to recognized incoming data as JSON
app.use(express.json())

// String/array: tells express to recognize incoming data as string or array
app.use(express.urlencoded({ extended: false }))

// Custom-made logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

// Tells express where to look for static files (images, css...). These will be analyzed in order
app.use(express.static('public'));
app.use(express.static('css'));

/**
 * Routes
 */
app.use("/routes/time", timeRoutes)
app.use("/routes/names", nameRoutes)
app.use("/routes/json", jsonRoutes)
app.use("/routes/echo-all", echoAllRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "form.html"))
})

app.get('/:word/echo', (req, res) => {
    res.json({ "echo": req.params.word })
})

// Fallback route
app.all('*', (req, res) => {
    res.send("Invalid route")
})




/**
 * Listen
 */
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));