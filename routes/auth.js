const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const masterdb = require('../config/master')
const {JWT_KEYS} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/login', (req, res) => {
	var {mobile, password} = req.body
	if(!mobile || !password){
		return res.status(422).json({status:"fail", message: "Please provide mobile number & password"})
	}
	masterdb.execute('SELECT * FROM customer WHERE customer.customer_mobile = ?', [mobile])
	.then(([savedUser]) => {
		if(!savedUser[0]){
			return res.json({status:"fail", message: "Mobile not registered"})
		}
		if(savedUser[0].customer_password.localeCompare(password) === 0){
			var customer_id = savedUser[0].customer_id
			const token = jwt.sign({customer_id: customer_id}, JWT_KEYS)
			info = {
				status:"success",
				isLogin:true,
				token:token, 
			}
			res.json(info)
		}
		else {
			return res.json({status:"fail", message: "Invalid Mobile number or password"})
		}
	}).catch((err) => {
		console.log('Error in fetching employee', err)
	});
})

router.get('/', requireLogin, (req, res) => {
	res.json(req.user)
})

module.exports = router;