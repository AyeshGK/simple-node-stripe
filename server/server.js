require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const sequelize = require('./database/dbConn')
const paymentController = require('./controller/paymentController')

app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500' // <-- your client app url (live server)
}))


// Path: server\server.js
const { PORT } = process.env


app.post('/buy', paymentController.buy)


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
        // sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.log('Error: ' + err))

