const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        // we can also hardcode this to 
        // const task = await task.create({ name: 'First Name', complete: true })
        // but passing req.body directly from the postman is more ideal
        // we are now waiting for a task. So now instead of sending req.bodty, we will just send the task
        // So instead of sending res.json(req.body), we will send 
        res.status(201).json({ task })
        // This will create a new task and send it back to the client
        // This is also getting eventually updated in mongoDB
        // We will update the rest of the controllers in similar fashion
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        // This means that we are getting id value from req.params which will  be stored under the name taskID
        const task = await Task.findById({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No Task with id : ${taskID}` })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
        res.status(200).json({ id: taskID, data: req.body })
        // This is the response that we will send back to the client
        // if we are updating something then we need the new info

        if (!task) {
            return res.status(404).json({ task })
        }
    } catch (error) {

    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findByIdAndDelete({ _id: taskID })

        if (!task) {
            return res.status(404).json({ msg: `No Task with id : ${taskID}` })
        }

        res.status(200).json({ msg: `Task with id : ${taskID} deleted` })
        // In the frontend part we dont neded to send the deleted task back
        // We can just send a message saying that the task is deleted
        // and the front will use the api to recall the list of tasks to diplaythe remaining tasks after deletion
        // rather than this we can just do
        // res.status(200).send()
        // or 
        // even
        // res.status(200).json({ task: null, status: 'success' })
        // because once we are deleting at the front end we know what item we are deleting 
        // and we dont need to send any specific message to the front end that we are deleting the task
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
    res.send(`Delete Task`)
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}