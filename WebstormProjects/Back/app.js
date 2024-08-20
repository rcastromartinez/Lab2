const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

let todos = [
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn TypeScript', done: true },
    { id: 3, text: 'Build a TO DO List', done: true },
];
let nextId = 4;

app.use(cors());
app.use(express.json());

// GET: Retrieve all TO-DO items
app.get('/todos', async (req, res) => {
    const todos = await prisma.task.findMany();
    res.json(todos);
});

// POST: Add a new TO-DO item
app.post('/todos', async (req, res) => {
    const newTodo = await prisma.task.create({
        data: {
            text: req.body.text,
            done: false,
        },
    });
    res.status(201).json(newTodo);
});

// PUT: Edit an existing TO-DO item
app.put('/todos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedTodo = await prisma.task.update({
            where: { id: id },
            data: {
                text: req.body.text,
                done: req.body.done,
            },
        });
        res.json(updatedTodo);
    } catch (error) {
        res.status(404).send('TO-DO item not found');
    }
});

// DELETE: Delete a TO-DO item
app.delete('/todos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deletedTodo = await prisma.task.delete({
        where: { id: id },
    });
    res.json(deletedTodo);
});

app.listen(port, () => {
    console.log(`TO-DO app listening at http://localhost:${port}`);
});