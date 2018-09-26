let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path');
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coin_db');

// let Schema = mongoose.Schema;

// let TasksSchema = new mongoose.Schema({
// 	title: {type: String, required: true, minlength: 3, maxlength: 30},
// 	description: {type: String, required: true, maxlength: 100, default: ""},
// 	completed: {type: Boolean, required: false, default: false}
// 	}, {timestamps: true});

// mongoose.model('Tasks', TasksSchema);
// let Tasks = mongoose.model('Tasks');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(body_parser.json()); 
app.use(session({ 
	secret: "iuewqgf937rt873qeyhoi2wheduyetgsfcyeg37tf",
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.use(express.static( __dirname + '/coin-app/dist' ));

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./coin-app/dist/index.html"));
});

var server = app.listen(4200, () => {
	console.log("Running in localhost at port 4200");
});

// app.get('/tasks', (req, res) => {
// 	Tasks.find({}, (err, tasks) =>
// 	{
// 		if(err)
// 		{
// 			console.log("Uh-oh! Something's wrong with the tasks!");
// 			res.json({message: "Error", errors: tasks.errors});
// 		}
// 		else
// 		{
// 			console.log("Yay!");
// 			res.json({message: "Success", data: tasks});	
// 		}
// 	});
// });

// app.get('/tasks/:this_task_id', (req, res) => {
// 	Tasks.findOne({_id: req.params.this_task_id}, (err, task) =>
// 	{
// 		if(err)
// 		{
// 			console.log("Uh-oh! Something's wrong with getting this task!");
// 			res.json({message: "Error", errors: task.errors});
// 		}
// 		else
// 		{
// 			console.log("Hooray!");
// 			res.json(task);	
// 		}
// 	});
// });

// app.delete('/tasks/:this_task_id', (req, res) => {
// 	Tasks.remove({_id: req.params.this_task_id}, (err, task) =>
// 	{
// 		if(err)
// 		{
// 			console.log("Uh-oh! Something's wrong with removing this task!");
// 			res.json({message: "Error", errors: task.errors});
// 		}
// 		else
// 		{
// 			console.log("Woohoo!");
// 			res.json({message: "Successfully removed a task"});	
// 		}
// 	});
// });

// app.post('/tasks', (req, res) => {
// 	let tasks = new Tasks({title: req.body.title, description: req.body.description, completed: req.body.my_completed});

// 	tasks.save((err) =>
// 	{
// 		if(err)
// 		{
// 			console.log("Uh-oh! Something's wrong with adding this task!");
// 			res.json({message: "Error", errors: tasks.errors});
// 		}
// 		else
// 		{
// 			console.log("Right on!");
// 			res.json({message: "Successfully added a task"});	
// 		}
// 	});
// });

// app.put('/tasks/:this_task_id', (req, res) => {
// 	Tasks.update({_id: req.params.this_task_id}, {title: req.body.title, description: req.body.description}, (err, this_task) =>
// 	{
// 		if(err)
// 		{
// 			console.log("Uh-oh! Something's wrong with updating this task!");
// 			res.json({message: "Error", errors: this_task.errors});
// 		}
// 		else
// 		{
// 			console.log("Awesome!");
// 			res.json({message: "Successfully updated a task"});	
// 		}
// 	});
// });