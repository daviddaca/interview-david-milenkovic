require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use( express.json() );
app.use(cors());

const todoRouter = require('./routes/todos.js');
app.use('/api/todos', todoRouter);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
