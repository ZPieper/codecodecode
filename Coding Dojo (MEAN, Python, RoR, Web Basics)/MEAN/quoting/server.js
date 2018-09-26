let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path');
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quote_db');

let QuoteSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 3},
	text: {type :String, required: true, minlength: 3, maxlength: 100}
}, {timestamps: true});

mongoose.model('Quote', QuoteSchema);
let Quote = mongoose.model('Quote');

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
	res.render('index');
});

app.get('/quotes', (req, res) => {
	Quote.find({}, (err, quotes) => {
		if(err)
		{
			res.render('index', {errors: quote.errors});
		}
		else
		{
			res.render('quotes', {quotes: quotes});
		}
	});
});

app.post('/quotes', (req, res) => {

	function censor(str, arr) {
		let count = 0;
		let new_str = "";
		for (let i = 0; i < arr. length; i++)
		{
			if (arr[i].length == str.length)
			{
				for (let y = 0; y < str.length; y++)
				{
					if (str[y] == arr[i][y] || str[y] == "?")
					{
						count++;
						if (count % arr[i].length == 0)
						{
							for (let j = 0; j < arr[i].length; j++)
							{
								new_str += "X";
							}
							return new_str;
						}
					}
				}			
			}
		}
		return str;
	}

	let str = req.body.my_quote;
	let arr = ["WAT", "onion"];
	let q = censor(str, arr);

	var quote = new Quote({name: req.body.my_name, text: q});

	quote.save((err) => {
		if(err)
		{
			res.render('index', {errors: quote.errors});
		}
		else
		{
			res.redirect('/quotes');
		}
	})
});

var server = app.listen(6789, () => {
	console.log("Running in localhost at port 6789");
});
// var io = require('socket.io').listen(server);

// io.sockets.on('connection', (socket) => {
// 	console.log("Client/socket is connected!");
// 	console.log("Client/socket id is: ", socket.id);

// 	socket.on('up_num', () => {
// 	if (session.count >= 1)
//     {
//         session.count++;
//     }
//     else
//     {
//         session.count = 1;
//     }
// 	io.emit('up', session.count);
// 	});

// 	socket.on('zero_num', () => {
// 	session.count = 0;
// 	io.emit('reset');
// 	});
// })

// for (let i = 0; i < arr. length; i++)
// 		{
// 			if (arr[i].length == str.length)
// 			{
// 				for (let x = 0; x <= arr[i].length - str.length; x++)
// 				{
// 					for (let y = 0; y < str.length; y++)
// 					{
// 						if (str[y] == arr[i][x+y] || str[y] == "?")
// 						{
// 							count++;
// 							if (count % arr[i].length == 0)
// 							{
// 								for (let j = 0; j < arr[i].length; j++)
// 								{
// 									new_str += "X";
// 								}
// 								return new_str;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		return str;
// 	}