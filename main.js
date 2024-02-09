const express = require('express')
const tasks = require('./routes/tasks')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use('/tasks', tasks)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})









