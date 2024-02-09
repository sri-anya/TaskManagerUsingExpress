const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');



// Sample in-memory data store for tasks
const tasks = [];


// Middleware for parsing JSON in the request body
router.use(bodyParser.json());

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {

  res.render('tasks', {tasks: tasks})

})
// define the about route
router.get('/about', (req, res) => {
  res.send('About tasks')
})


// //Create a Task:

// Endpoint: POST /tasks
// Users can send a request to create a new task by providing task details in the request body (e.g., task name, description, due date).

router.post('/', (req, res) => {
  console.log( req.body.taskName)
  const { taskName, description, dueDate } = req.body;

  // Create a new task object
  const newTask = {
    id: tasks.length + 1,
    taskName,
    description,  
    dueDate,
  };

  // Add the new task to the in-memory data store
  tasks.push(newTask);

  // Send a response with the newly created task
  res.status(201).json(newTask);
})


// Get Task by ID:

// Endpoint: GET /tasks/:id
// Retrieve a specific task by its ID. Users can provide the task ID in the URL to get detailed information about a particular task.
router.get('/:id', (req, res) => {
  const reqIndex = req.params.id
  const requestedTask = tasks.find((task) => {
    console.log(typeof task.id, typeof reqIndex)
    // task.id is a number and reqIndex is a string
    if ((task.id).toString() === reqIndex) {
      return true
    }

  }

  )
  console.log(`requestedTask, ${requestedTask}`)
  res.send(`${req.params.id}, ${requestedTask.taskName}`)

})

//   Update a Task:

// Endpoint: PATCH /tasks/:id
// Allow users to update specific details of a task. Users can send a request with the task ID in the URL and provide the updated details in the request body.
router.patch('/:id', (req, res) => {
  const { taskName, description, dueDate } = req.body;
  const reqIndex = req.params.id
  const taskToUpdate = tasks.find((task) => {
    console.log(typeof task.id, typeof reqIndex)
    // task.id is a number and reqIndex is a string
    if ((task.id).toString() === reqIndex) {
      return true
    }

  })
  // Create a new task object


  // Add the new task to the in-memory data store
  taskToUpdate.taskName = taskName || taskToUpdate.taskName;
  taskToUpdate.description = description || taskToUpdate.description;
  taskToUpdate.dueDate = dueDate || taskToUpdate.dueDate;

  // Send a response with the newly created task
  res.json(taskToUpdate);

})

// Delete a Task:

// Endpoint: DELETE /tasks/:id
// Allow users to delete a task by providing the task ID in the URL.
router.delete('/:id', (req, res) => {
  console.log("delete called")
  const taskId = parseInt(req.params.id);

  // Find the task by ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  

  // Remove the task from the array
  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json({ message: 'Task deleted successfully', deletedTask });
});

  module.exports = router