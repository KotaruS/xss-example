const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 8000
const errorHandler = require('./middleware/errorMiddleware')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/status', (req, res) => res.status(200).send('Running...'))
app.use('/api/', require('./routes/mainRoutes'))

app.use(express.static(path.join(__dirname, '../build')))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})