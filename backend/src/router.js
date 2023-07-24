const express = require('express')
const router = express.Router()

const tasksControler = require('./controller/tasksController')
const tasksMiddleware = require('./middlewares/tasksMiddlewaress')

router.get('/tasks', tasksControler.getAll);
router.post('/tasks', tasksMiddleware.validafielstitle, tasksControler.createtasks);
router.delete('/tasks/:id', tasksControler.deleteTasks);
router.put('/tasks/:id',
tasksMiddleware.validafielstitle,
 tasksMiddleware.validafieldstatus,
  tasksControler.updateTasks);


module.exports = router;