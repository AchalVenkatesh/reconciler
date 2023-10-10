import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app=express();

app.use(bodyParser.json());

var todos = fs.readFileSync("todos.json","utf-8")
todos.

app.get('/',(req,res)=>{
    res.json(todos)
})

app.post('/',(req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    var id = todos[(todos.length - 1)].id;
    if(todos.length == 0){
     todos.append({
        title  : title,
        description : description,
        id : 1
    })   
    }
    else{
    todos.append({
        title  : title,
        description : description,
        id: id + 1
    })}
})

app.delete('/',(req,res)=>{
    var todoIndex = todos.findIndex(test => test.id == parseInt(req.params.id))
    todos.splice(todoIndex,1);
})

app.listen(3001);