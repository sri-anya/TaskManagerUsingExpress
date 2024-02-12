
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.set('view engine', 'ejs');


// Sample in-memory data store for tasks
const tasks = [];


// Middleware for parsing JSON in the request body
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// define the home page route
app.get('/', (req, res) => {

  res.render('tasks', {tasks: tasks})
  // res.send(tasks)

})
// define the about route
app.get('/about', (req, res) => {
  
  res.render('about')
})


// //Create a Task:

// Endpoint: POST /tasks
// Users can send a request to create a new task by providing task details in the request body (e.g., task name, description, due date).

app.post('/', (req, res) => {
  
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
app.get('/:id', (req, res) => {
  const reqIndex = req.params.id
  const requestedTask = tasks.find((task) => {
    
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
app.patch('/:id', (req, res) => {
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
app.delete('/:id', (req, res) => {
 
  const taskId = parseInt(req.params.id);

  // Find the task by ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  

  // Remove the task from the array
  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json({ message: 'Task deleted successfully', deletedTask });
});

 









