const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");