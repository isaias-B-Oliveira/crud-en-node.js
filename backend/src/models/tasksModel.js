const conection = require('./conections')



const getAll = async () => {
    const tasks = await conection.execute('SELECT * FROM tasks');
    return tasks [0];
};

const createtasks = async (task) => {
    const {title} = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)'
    const [createdtasks] = await conection.execute(query, [title, 'pendente', dateUTC])
    return {insertId: createdtasks.insertId} 
};

const deleteTasks = async (id) => {
    const [removedtasks] = await conection.execute('DELETE FROM tasks WHERE id = ?', [id])
    return removedtasks
};

const updateTasks = async (id, task) => {
    const { title, status } = task
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?'
    const [updatedTasks] = await conection.execute(query, [title, status, id])
    return updatedTasks
};

module.exports = {
    getAll,
    createtasks,
    deleteTasks,
    updateTasks,
};