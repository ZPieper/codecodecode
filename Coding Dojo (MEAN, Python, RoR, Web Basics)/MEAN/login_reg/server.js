let express = require('express'),
	app = express(),
	body_parser = require('body-parser'),
	session = require('express-session'),
	path = require('path'),
	bcrypt = require('bcryptjs'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login_reg_db');

let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
	first_name: {
		type: String, 
		required: [true, "First name is required."], 
		minlength: [2, "First name is too short."], 
		maxlength: [20, "First name is too long."]},
	last_name: {
		type: String, 
		required: [true, "Last name is required."], 
		minlength: [2, "Last name is too short."], 
		maxlength: [20, "Last name is too long."]},
	email: {
		type: String, 
		required: [true, "Must have an email."], 
		unique: [true, "Email already in database."],
		validate: {
			validator: (value) => {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
		},
		message: "Not a valid email."
		}},
	password: {
		type: String, 
		required: [true, "Must have a password."], 
		minlength: [8, "Password must be at least 8 characters."], 
		validate: { 
			validator: (value) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
		},
		message: "Password failed validation, you must have at least 1 number, uppercase and special character." 
		}},
	birthday: {
		type: Date, 
		required: [true, "You need a birthday!"], 
		validate: {
			validator: (value) => {
				if (value > Date.now()) //Matt said this was good to know
				{
					return false;
				}
				else
				{
					return true;
				}
		},
		message: "Cannot have a birthday in the future."
		}}
	}, {timestamps: true});

mongoose.model('User', UserSchema);
let User = mongoose.model('User');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(body_parser.json()); 
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

app.post('/register', (req, res) => {
	if ((req.body.password == req.body.password_conf) && (req.body.password.length > 7) && (req.body.password_conf.length > 7)){
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, coded) => {
				let new_pw = coded;
				let user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: new_pw, birthday: req.body.birthday});

				user.save((err) => {
					if(err)
					{
						res.render('index', {errors: user.errors});
					}
					else
					{
						req.session.user = user._id;
						res.render('success', {this_user: user});	
					}
				});
			});
		});
	}
	else
	{
		let wrong = {message: "Passwords must match and have at least 8 characters."};
		let errors = [];
		errors.push(wrong);
		res.render('index', {errors: errors});
	}
});

app.post('/login', (req, res) => {
	User.findOne({email: req.body.email_log}, (err, this_user) =>
	{
		if(this_user)
		{			
			bcrypt.compare(req.body.password_log, this_user.password).then((status) => {
				if(status == false)
				{
					res.render('index', {errors: this_user.errors});
				}
				else
				{
					req.session.user = this_user._id;
					res.render('success', {this_user: this_user});
				}});
		}
		else
		{
			let invalid = {message: "Invalid login information."};
			let errors = [];
			errors.push(invalid);
			res.render('index', {errors: errors});
		}
	});
});

app.get('/logout', (req, res) => {
	req.session.user = "";
	res.render('index');
});

var server = app.listen(6789, () => {
	console.log("Running in localhost at port 6789");
});