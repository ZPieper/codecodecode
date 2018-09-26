let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path');
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/95_db');

let Schema = mongoose.Schema;

let MessageSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type :String, required: true, minlength: 10, maxlength: 100},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

let CommentSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type :String, required: true, minlength: 10, maxlength: 100},
	_message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestamps: true});

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
let Message = mongoose.model('Message');
let Comment = mongoose.model('Comment');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(session({ 
	secret: "iuewqgf937rt873qeyhoi2wheduyetgsfcyeg37tf",
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	Message.find({}).populate('comments').exec((err, messages) =>
	{
		if(err)
		{
			console.log("Uh-oh! Something's wrong with the messages!");
			res.render('index', {errors: message.errors});
		}
		else
		{
			console.log("Yay!");
			res.render('index', {messages: messages});	
		}
	});
});

app.post('/message', (req, res) => {
	let message = new Message({name: req.body.my_name, text: req.body.my_message});

	message.save((err) => {
		if(err)
		{
			console.log("Uh-oh! Something's wrong!");
			res.render('index', {errors: message.errors});
		}
		else
		{
			console.log("You've added a message to the database!");
			res.render('index');
		}
	})
});

// app.get('/comment/:id', (req, res) => {
// 	Message.findOne({_id: req.params.id}).populate('comments').exec((err, comment) => {
// 		res.render('index', {comment: comment});
// 	});
// });

app.post('/comment/:id', (req, res) => {
	Message.findOne({_id: req.params.id}, (err, this_message) => {
		let comment = new Comment(req.body);
		comment._message = this_message._id;

		comment.save((err) => {
			
				if(err)
				{
					console.log("Something happened with trying to post a comment.");
					res.render('index', {errors: comment.errors});
				}
				else
				{
					this_message.comments.push(comment);
					this_message.save((err) => {
					console.log("You've added a comment to a message!");
					res.redirect('/');
					});
				}
		});
	});
});

var server = app.listen(6789, () => {
	console.log("Running in localhost at port 6789");
});