let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path');
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/author_db');

let Schema = mongoose.Schema;

let AuthorsSchema = new mongoose.Schema({
	name: {type: String, 
		required: [true, "Name is required."], 
		unique: [true, "This author is already in the database."], 
		minlength: [3, "Authors must have a minimum of 3 characters."], 
		maxlength: [30, "That author is too long."]},
	quotes: [{type: Schema.Types.ObjectId, ref: 'Quotes'}]
	}, {timestamps: true});

let QuotesSchema = new mongoose.Schema({
	content: {type: String, 
		required: [true, "You must fill in something!"], 
		minlength: [3, "Quotes must have a minimum of 3 characters."], 
		maxlength: [100, "That quote is too long."]},
	popularity: {type: Number, 
		required: false, 
		default: 0},
	_author: {type: Schema.Types.ObjectId, ref: 'Authors'}
	}, {timestamps: true});

mongoose.model('Authors', AuthorsSchema);
mongoose.model('Quotes', QuotesSchema);
let Authors = mongoose.model('Authors');
let Quotes = mongoose.model('Quotes');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(body_parser.json()); 
app.use(session({ 
	secret: "iuewqgf937rt873qeyhoi2wheduyetgsfcyeg37tf",
	proxy: true,
	resave: false,
	saveUninitialized: true
}));

app.use(express.static( __dirname + '/ng-authors/dist' ));

app.get('/authors', (req, res) => {
	//sort by A-Z
	Authors.find({}).sort({name: 1}).exec((err, authors) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({message: "Success", data: authors});	
		}
	});
});

app.get('/authors/:this_author_id', (req, res) => {
	Authors.findOne({_id: req.params.this_author_id}, (err, author) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({author: author});	
		}
	});
});

app.delete('/authors/:this_author_id', (req, res) => {
	Authors.remove({_id: req.params.this_author_id}, (err, author) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({message: "Successfully removed a author"});	
		}
	});
});

app.post('/authors', (req, res) => {
	let authors = new Authors({name: req.body.name});

	authors.save((err) =>
	{
		if(err)
		{
			return res.status(400).json(err);
		}
		else
		{
			res.json({message: "Successfully added a author"});	
		}
	});
});

app.put('/authors/:this_author_id', (req, res) => {
	Authors.findOne({name: req.body.name}, (err, author) => {
		if ((req.body.name.length > 2) && (req.body.name.length < 31) && (!author))
		{
			Authors.update({_id: req.params.this_author_id}, {name: req.body.name}, (err, this_author) =>
			{
				if(err)
				{
					return res.status(400).json(err);
				}
				else
				{
					res.json({message: "Successfully updated a author"});	
				}
			});
		}
		else
		{
			return res.status(400).json({err: "Names of authors are required and must have between 3 and 30 characters."});
		}
	});
});

app.get('/quotesby/:this_author_id', (req, res) => {
	Authors.findOne({_id: req.params.this_author_id}).populate('quotes').exec((err, author_quotes) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({author_quotes: author_quotes});	
		}
	});
});

app.post('/newquoteby/:this_author_id', (req, res) => {
	let quotes = new Quotes({content: req.body.content, _author: req.params.this_author_id});

	Authors.findOne({_id: req.params.this_author_id}, (err, this_author) => {
		let quote = new Quotes({content: req.body.content});
		quote._author = this_author._id;

		quote.save((err) => {
			
				if(err)
				{
					return res.status(400).json(err);
				}
				else
				{
					this_author.quotes.push(quote);
					this_author.save((err) => {
					res.json({message: "Successfully added a quote"});	
					});
				}
		});
	});
});

app.delete('/quotes/:this_quote_id', (req, res) => {
	Quotes.remove({_id: req.params.this_quote_id}, (err, quote) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({message: "Successfully removed a quote"});	
		}
	});
});

app.get('/name/:this_author_id', (req, res) => {
	Authors.findOne({_id: req.params.this_author_id}, (err, author) =>
	{
		if(err)
		{
			res.json({message: "Error", errors: err});
		}
		else
		{
			res.json({author: author});	
		}
	});
});

app.patch('/quotes/vote/:this_quote_id', (req, res, num) => {
	Quotes.findByIdAndUpdate(req.params.this_quote_id, 
		{
			$inc: {
				popularity: req.body.num
			}
		},
		(err, this_quote) => {
			if(err)
			{
				res.json({message: "Error", errors: err});
			}
			else
			{
				res.json(this_quote);	
			}
		}
	);
});

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./ng-authors/dist/index.html"));
});

var server = app.listen(4200, () => {
	console.log("Running in localhost at port 4200");
});