const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')

const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


var todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));

app.get('/',(req,res)=>{
    res.json(todos)
})

app.post('/',(req,res)=>{
    console.log(req.body);
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    }
    todos.push(newTodo)
    console.log(todos)
    fs.writeFileSync('todos.json',JSON.stringify(todos));
    res.status(204).send(newTodo)
})

app.delete('/',(req,res)=>{
    var todoIndex = todos.findIndex(test => test.id == parseInt(req.params.id))
    todos.splice(todoIndex,1);
})

app.listen(3001,()=>{
    console.log("App listening at 3001")
});