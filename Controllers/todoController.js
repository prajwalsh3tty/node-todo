let bodyParser = require('body-parser')
let mongoose = require('mongoose')

//connect to the database
//mongoose.Promise = global.Promise
mongoose.connect('mongodb://test:test123@ds121371.mlab.com:21371/todos')  //todo - there is a way to hide this from git, think by putting in a different file and requiring that file, but adding that file to the gitignore?

//create a schema - like a blueprint of what the db should expect to receive, it validates what can and can't be added
let todoSchema = new mongoose.Schema({
  item: String
})

// create the model
// the string Todo below is the name of the collection that will be used to store the todos. It will be created in the db if not already there. The var Todo is just a variable, but is usually named the same as the collection. the Todo is what you use to interact with the collection... Todo.find(), update, remove etc. 
// example: let myNextTodo = new Todo({item: "buy groceries"})  // create the todo object based on the todoSchema blueprint
// myNextTodo.save()  // insert that object into the db
let Todo = mongoose.model('todos', todoSchema)
// this returns a Todo object with a save method on it, so save can be called

// this is just a test to add an item to the mongo db to confirm functionality.
// var itemOne = Todo({item: 'get flowers'}).save(function(err) {
//      if (err) throw err
//      console.log('item saved')
//  })


//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'do some coding'}]  // using this var, the data is only stored on the server temporarily... until the server file is restarted. This is dummy data, used to do the initial testing, before the mongo db is hooked up.

let urlencodedParser = bodyParser.urlencoded({extended: false});     // gives access to the body of a post request via the req.body param

module.exports = function(app) {        // this is a function that takes app as an arg. this function is called from app.js and passes app into the function here so it can use it as app.get, app.post etc.

    app.get('/todo', function(req, res) {
        // get data from mongo and pass it to the view
       Todo.find({}, function(err, data) {
            if (err) throw err
            res.render('todo', {todos: data})
        })
           // don't need this bit since moving from using the data array above to using mongodb. 
        //res.render('todo', {todos: data})
    });

    // Add a Tasks via $.ajax (todo-list.js)
    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from the view and add it to the mongodb
       Todo(req.body).save(function(err, data) {
            if (err) throw err
            res.json(data)
        })
        //  don't need this bit now we've move from using the data array above to the mongodb
        // data.push(req.body)     // from the AJAX call in public/assets/todo-list.js
        // console.log(req.body)
        // res.json(data)      // returns the above data array to the browser. the AJAX call on success function does a location.reload() page reload causing the page to be re-rendered, and as it now has the new data array it renders that array.
        // console.log(data)
    });

    // Delete a Task via $.ajax (todo-list.js)
    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from mongodb
       Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
            if (err) throw err
            res.json(data)
        });
        // don't need this bit now we've move from using the data array above to the mongodb
        // data = data.filter(function(todo) {
              
        //     return todo.item.replace(/ /g, '-') !== req.params.item  // replacing spaces with hyphens so can compare to the params.item which had it's spaces removed also'. If this statement returns true (i.e. the item is not the params.item it is kept in the array). The net result is that the params.item is removed from the array. 
        // });
        // res.json(data)
    });

};
