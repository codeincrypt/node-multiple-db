const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;

const cors = require('cors')

// CUSTOMER
const customerRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user' , customerRoutes)

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('RedoQ app running on port - '+ PORT);
});