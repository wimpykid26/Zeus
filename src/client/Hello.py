from flask import Flask,  redirect, url_for, request , render_template
from signup_login import insert_into_mongo, check_if_present
app = Flask(__name__)

# @app.route('/')
# def welcome_page():
# 	return render_template('login.html')
# 	#return render_template('welcome.html')

# @app.route('/LoginPage')
# def login_page():
# 	return render_template('LoginPage.html')

# @app.route('/SignupPage')
# def signup_page():
# 	return render_template('SignupPage.html')

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
		print(password+"asdsda")
		# print("wow1")

	else:
		# print("wow2")
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
if __name__ == '__main__':
   app.run(debug = True)