
const tasksModel = require('../models/tasksModel')

const getAll = async (_req, res) => {
    const tasks = await tasksModel.getAll() 
    return res.status(200).json(tasks)
};

const createtasks = async (req, res) => {
    const cretedtasks = await tasksModel .createtasks(req.body)
    return res.status(201).json(cretedtasks)
}

const deleteTasks = async (req, res) => {
    const {id} = req.params
    await tasksModel.deleteTasks(id)
    return res.status(204).json()
}

const updateTasks = async (req, res) => {
    const {id} = req.params
    await tasksModel.updateTasks(id, req.body)
    return res.status(204).json()
}

module.exports = {
    getAll,
    createtasks,
    deleteTasks,
    updateTasks,
};