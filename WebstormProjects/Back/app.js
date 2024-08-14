const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn TypeScript', done: true },
    { id: 3, text: 'Build a TO DO List', done: true },
];
let nextId = 4;

// GET: Retrieve all TO-DO items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST: Add a new TO-DO item
app.post('/todos', (req, res) => {
    const newTodo = {
        id: nextId++,
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: Edit an existing TO-DO item
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = req.body.text;
        if (req.body.hasOwnProperty('done')) {
            todo.done = req.body.done;
        }
        res.json(todo);
    } else {
        res.status(404).send('TO-DO item not found');
    }
});

// DELETE: Delete a TO-DO item
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).send('TO-DO item not found');
    }
});

app.listen(port, () => {
    console.log(`TO-DO app listening at http://localhost:${port}`);
});