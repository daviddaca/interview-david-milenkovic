const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');

const getTodo = async (req, res, next) => {
    let todo;
    try {
        todo = await Todos.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.todo = todo;
    next();
}

router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find().sort({created_at: -1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title } = req.body;

    if(!title)
        res.status(400).send({ message: 'Title is required' });

    const todos = new Todos({
        title: title,
        finished: 0
    });

    try {
        const newTodo = await todos.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.put('/:id', getTodo, async (req, res) => {
    const { id } = req.params;
    const { title, finished } = req.body;

    if (title != null) {
        res.todo.title = title;
    }

    if (finished != null) {
        res.todo.finished = finished;
    }

    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getTodo, async (req, res) => {
    try {
        const deletedTodo = await res.todo.remove();
        res.json(deletedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router