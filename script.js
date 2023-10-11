const error = require('error')

function onClick(){
    title = document.getElementById("title")
    description = document.getElementById("description")
    fetch("http://localhost:3001",{
        method: "POST",

        body: JSON.stringify({
            title: title,
            description: description,
        }),

        headers: {
            "Content-type":"application/json"
        }
    }).then(callback)
    .then(error=> console.log("Fetch error:",error))
}

function callback(resp){
    resp.json().then(parsedResponse);
}

function parsedResponse(data){
   var parentElement=document.getElementById("mainArea");
   var childElement = document.createElement("div");

   var grandchildElement1 = document.createElement("span");
   var head1 = document.createElement("h2")
   grandchildElement1 = data.title;
   var break1 = document.createElement("br")

   var grandchildElement2 = document.createElement("span")
   var head2 = document.createElement("h2")
   grandchildElement2 = data.description;
   var break2 = document.createElement("br")

   var grandchildElement3 = document.createElement("button");
    grandchildElement3 = "Delete";
    grandchildElement3.setAttribute("onClick","deleteTodo("+data.id+")");

    childElement.appendChild(grandchildElement1);
    childElement.appendChild(grandchildElement2);
    childElement.appendChild(grandchildElement3);
    parentElement.appendChild(childElement);
}

function deleteTodo(id){
    fetch("http://localhost:3001",{
        method: "DELETE"
    }).then(()=>{
        var parentElement = document.getElementById("mainArea");
        parentElement.removeChild()
    })
    .then(error=> console.log("Fetch error:",error))
}