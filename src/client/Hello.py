from flask import Flask,  redirect, url_for, request , render_template, jsonify
from signup_login import insert_into_mongo, check_if_present
from flask.ext.cors import CORS, cross_origin
from retrieve_similarity import retrieve
import json
import unicodedata
app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
@app.route('/signup',methods = ['POST', 'GET'])
def signup():
	# print("hello")
	user = ""
	password = ""
	fullname =  email  = mobile = ""
	if request.method == 'POST':
		global password, user, fullname, email, mobile
		password = request.form['password']
		user = request.form['username']
		fullname = request.form['fullname']
		email = request.form['email']
		mobile = request.form['mobile']

	else:
		global password, user, fullname, email, mobile
		user = request.args.get('username')
		fullname = request.args.get('fullname')
		email = request.args.get('email')
		password = request.args.get('password')
		mobile = request.args.get('mobile')
	print(password+"asdsda")
	value = insert_into_mongo(str("users"), fullname, user, email, password, mobile)
	print(value)
	if value is 1:
		return 'Successfully Signed up as %s' % fullname
	else:
		return 'User Already registered! Try Again '


@app.route('/login',methods = ['POST', 'GET'])
def login():
	user = ""
	loginpassword = ""
	if request.method == 'POST':
		user = request.form['username']
		password = request.form['password']
		loginpassword = password
		print(password)
	value = check_if_present(str("users"), user, loginpassword)
	if value is 1:
		return "Successfully Logged in "
	else:
		return "Incorrect Credentials "

@app.route('/get_similar',methods = ['POST', 'GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_similar():
	if request.method == "GET":
		result = retrieve(request.args.get('article_id'), request.args.get('category'))
		for i in result:
			if isinstance(i, unicode):
				i=unicodedata.normalize('NFKD', i).encode('ascii','ignore')
		return jsonify(result['similar_to'])

if __name__ == '__main__':
   app.run(debug = True)
