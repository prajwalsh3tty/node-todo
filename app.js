const express = require('express');

const todoController=require('./Controllers/todoController');

var app=express();

//set up template engine 

app.set('view engine', 'ejs');

//static files 

app.use(express.static('./public'));


///controller
todoController(app);

 
// list en to port

app.listen(8080);

console.log('You are listening to port 8080');

/////////////
//lsof -i :8080
//sudo kill -9 10959