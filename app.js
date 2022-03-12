const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config({ path: '.env' })
const notFound = require('./middleware/not-found')

// middleware
app.use(express.static('./public'))
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send()
})
app.use('/api/v1/tasks', tasks)

// custom 404 response
app.use(notFound)

const port = 3500

// ***cp2
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server started on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start()