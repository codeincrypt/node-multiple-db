const jwt = require('jsonwebtoken');
const masterdb = require('../config/master')
const {JWT_KEYS} = require('../config/keys')

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(422).json({error: "You must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_KEYS, (err, payload) => {
        if(err){
            return res.status(422).json({error: "You must be logged in."})
        }
        const {customer_id} = payload
        masterdb.execute('SELECT * FROM customer WHERE customer.customer_id = ?', [customer_id])
        .then(([savedUser]) => {
            var empDetails = {
                id          : savedUser[0].customer_id,
                name        : savedUser[0].customer_name,
                mobile      : savedUser[0].customer_mobile,
                email       : savedUser[0].customer_email,
                password    : savedUser[0].customer_password,
                db_id       : savedUser[0].database_id,
            }
            req.user = empDetails
            next()
        })
    })
}