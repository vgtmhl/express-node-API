const express = require('express')
const router = express.Router()

router.route('/')
    .get(echoAll)
    .post(echoAll)
    .put(echoAll)

function echoAll(req, res) {
    const method = req.method

    const data = method === "GET" ? req.query : req.body

    if (!data.length) { res.status(204).json({ "message": "No data" }) }

    res.format({
        'text/plain': () => { res.send(data) },

        'text/html': () => {
            html = "<ul>"
            for (key in data) {
                html += `<li>${key}: ${data[key]}</li>`
            }
            html += "</ul>"

            res.send(html)
        },

        'application/json': () => { res.json(data) },

        'default': () => { res.status(406).send('Not acceptable') }
    })
}

module.exports = router