const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const requireLogin = require('../middleware/requireLogin')

const masterdb = require('../config/master')
const ch1db = require('../config/child1')
const ch2db = require('../config/child2')

router.get('/profile', requireLogin, (req, res) => {
    customer_id = req.user.id
    masterdb.execute('SELECT * FROM customer WHERE customer.customer_id = ?', [customer_id])
    .then(async([savedUser]) => {
        var info = {
            id          : savedUser[0].customer_id,
            name        : savedUser[0].customer_name,
            mobile      : savedUser[0].customer_mobile,
            email       : savedUser[0].customer_email,
            db_id       : savedUser[0].database_id,
        }
        var addressdata
        if(savedUser[0].database_id === "child1"){
            try {
                const addressch1 = await ch1db.execute('SELECT * FROM customeraddress WHERE customeraddress.customerid = ?', [customer_id])
                addressdata = addressch1[0][0]
            }
            catch (err) {
                console.log('Error in child 1 db address table', err)
            }
        }
        if(savedUser[0].database_id === "child2"){
            try {
                const addressch2 = await ch2db.execute('SELECT * FROM customeraddress WHERE customeraddress.customerid = ?', [customer_id])
                addressdata = addressch2[0][0]
            }
            catch (err) {
                console.log('Error in child 1 db address table', err)
            }
        }
        res.json({user:info, address:addressdata})
    })
    .catch((err) => {
        console.log('Error in fetching customer table', err)
    });
})

module.exports = router