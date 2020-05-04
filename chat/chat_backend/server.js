/*
Backend for website chat
TO-DO: Implement login
    : Complete chat service
*/



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Succesfully connected to MongoDB');
})

const usersRouter = require('./routes/users');
// const messagesRouter = require('./routes/messages');

app.use('/users', usersRouter);
// app.use('/messages', messagesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});