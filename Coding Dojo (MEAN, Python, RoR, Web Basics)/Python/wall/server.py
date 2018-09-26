from flask import Flask, request, redirect, render_template, session, flash
import re
import md5
import os
import binascii
# import the Connector function
from mysqlconnection import MySQLConnector
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'[a-zA-Z]+$')

app = Flask(__name__)
app.secret_key = "itspipez"
# connect and store the connection in "mysql"; note that you pass the database name to the function
mysql = MySQLConnector(app, 'wall')

@app.route('/')
def index():
	query = "SELECT * FROM users"
	users = mysql.query_db(query)

	if 'num' not in session:
		session['num'] = ''
	if 'user' not in session:
		session['user'] = ''
	return render_template('main.html', all_users = users)

@app.route('/logout')
def logout():
	session['num'] = ''
	return redirect('/')

@app.route('/login', methods = ["POST"])
def log():
	email = request.form['email_login']
	password = request.form['pw_login']
	query = "SELECT * FROM users WHERE users.email = :email LIMIT 1"
	data = { 'email': email }
	user = mysql.query_db(query, data)
	if len(user) != 0:
		encrypted_password = md5.new(password + user[0]['salt']).hexdigest()
		if user[0]['password'] == encrypted_password:
			if user[0]['id'] == session['num']:
				flash("You are already logged in.")
			else:
				session['num'] = user[0]['id']
				session['user'] = "Welcome " + user[0]['first_name']
				return redirect('/wall')
		else:
			flash("Incorrect password.")			
	else:
		flash("Incorrect email.")
	return redirect('/')

@app.route('/register', methods = ["POST"])
def reg():
	if len(request.form['fname_reg']) < 1 or len(request.form['lname_reg']) < 1 or len(request.form['pw_reg']) < 1 or len(request.form['pwconf_reg']) < 1:
		flash("All fields must be filled in.")
		return redirect('/')
	if len(request.form['fname_reg']) < 2 or len(request.form['lname_reg']) < 2:
		flash("A name needs to be at least 2 characters.")
	if not NAME_REGEX.match(request.form['fname_reg']) or not NAME_REGEX.match(request.form['lname_reg']):
		flash("A name is only supposed to have letters.")
	if len(request.form['email_reg']) < 1:
		flash("Email can't be blank.")
	if not EMAIL_REGEX.match(request.form['email_reg']):
		flash("Email is not valid.")

	query = "SELECT users.email FROM users WHERE email = :email"
	data = { 'email': request.form['email_reg'] }
	exists = mysql.query_db(query, data)
	if len(exists) != 0:
		flash("Email is already in database. Please use another.")

	if len(request.form['pw_reg']) < 8:
		flash("Password needs to be 8 characters.")
		return redirect('/')
	if request.form['pw_reg'] != request.form['pwconf_reg']:
		flash("Password and password confirmation do not match.")
	else:
		password = request.form['pw_reg']
		salt = binascii.b2a_hex(os.urandom(15))
		hashed_pw = md5.new(password + salt).hexdigest()
		

		query2 = "INSERT INTO users (first_name, last_name, email, password, salt, created_at, updated_at) VALUES (:first_name, :last_name, :email, :hashed_pw, :salt, NOW(), NOW())"
		data2 = { 
			'first_name': request.form['fname_reg'],
			'last_name': request.form['lname_reg'],
			'email': request.form['email_reg'],
			'hashed_pw': hashed_pw,
			'salt': salt
			}
		
		users_row = mysql.query_db(query2, data2)
		return redirect('/success')
	return redirect('/')

@app.route('/success')
def final():
	query = "SELECT * FROM users"
	users = mysql.query_db(query)
	return render_template('wahoo.html')

@app.route('/wall')
def make_msgs():
	query_find_all = "SELECT messages.id, messages.user_id, messages.content, messages.created_at, users.last_name, users.first_name FROM messages JOIN users ON users.id = messages.user_id ORDER BY messages.created_at DESC"
	messages = mysql.query_db(query_find_all)
	query_comments = "SELECT messages.id, comments.user_id, comments.content, users.last_name, users.first_name, comments.created_at FROM comments JOIN users ON users.id = comments.user_id JOIN messages ON messages.id = comments.message_id ORDER BY comments.created_at ASC"
	comments = mysql.query_db(query_comments)
	return render_template('wall.html', all_messages = messages, all_comments = comments)

@app.route('/postmessage', methods = ["POST"])
def posting():
	query_post = "INSERT INTO messages (content, created_at, updated_at, user_id) VALUES (:content, NOW(), NOW(), :id)"
	data_post = {
	'content': request.form['message'],
	'id': session['num']
	}
	message_post = mysql.query_db(query_post, data_post)
	return redirect('/wall')

@app.route('/postcomment/<message_id>', methods = ["POST"])
def commenting(message_id):
	query_comm = "INSERT INTO comments (content, created_at, updated_at, user_id, message_id) VALUES (:content, NOW(), NOW(), :user_id, :message_id)"
	data_comm = {
	'content': request.form['comment'],
	'user_id': session['num'],
	'message_id': int(message_id)
	}
	comment_post = mysql.query_db(query_comm, data_comm)
	return redirect('/wall')

app.run(debug=True)