const mongoose = require('mongoose');

// ***CP4
// we have now save secured our mongodb uri and it is well that truely protected in .env

// **cp3
// if there is an error, then express is gonna throw it explicitly wiyhout having the requirement to call any function

// this is how you should be connecting ro the data base but ****1cpr
// mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('CONNECTED TO MONGO DB')
// })
//     .catch((err) => {
//         console.log(err)
//     })

// but this is not the ideal way

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB

// this should be th ideal way



