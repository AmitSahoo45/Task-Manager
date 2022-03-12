const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

// ***cp5
// adding validation to our schema
// when we pass empty values like name: '', completed: '' or just {} that would get accepted.
// this isnt the best way to practice
// we want to make sure that the name is not empty and completed is a boolean
// thats why we are using the validate method

module.exports = mongoose.model('Task', TaskSchema) 