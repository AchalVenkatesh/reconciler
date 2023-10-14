const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')

const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


try {
  var todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
} catch (error) {
  console.log("Error reading or parsing 'todos.json':", error);
  // Handle the error appropriately, e.g., initialize 'todos' with an empty array
  var todos = [];
}


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
    res.status(201).send(newTodo)
})

app.delete('/:id',(req,res)=>{
    var todoIndex = todos.findIndex((test) => {
        return test.id == parseInt((req.params.id).substring(1),10)})
    console.log(todoIndex)
    todos.splice(todoIndex,1);
    fs.writeFileSync("todos.json",JSON.stringify(todos))
    console.log(todos)
})

app.listen(3001,()=>{
    console.log("App listening at 3001")
});