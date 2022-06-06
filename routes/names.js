const express = require('express')
const router = express.Router()

router.route('/')
    .get(nameReply)
    .post(nameReply)

function nameReply(req, res) {
    const method = req.method

    const firstName = method === "GET" ? req.query.first : req.body.first
    const lastName = method === "GET" ? req.query.last : req.body.last

    res.format({
        'text/plain': () => { res.send(`name: ${firstName} ${lastName}`) },

        'text/html': () => {
            let html =
                `<ul>
                    <li>First name: ${firstName}</li>
                    <li>Last name: ${lastName}</li>
                </ul>`;

            res.send(html);
        },

        'application/json': () => { res.json({ "name": `${firstName} ${lastName}` }) },

        'default': () => { res.status(406).send('Not acceptable') }
    })
}

module.exports = router;