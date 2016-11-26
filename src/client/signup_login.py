from pymongo import MongoClient 
from pymongo import ASCENDING
client = MongoClient()

def insert_into_mongo(user_table_name, full_name, username, email, password, mobile):
	
	db = client.temp
	print("inerting "+str(password))
	result = db[str(user_table_name)].create_index([('username', ASCENDING)], unique=True)
	try:
		data = db[str(user_table_name)].insert(
		[{
			
			"fullname" : full_name,
			"username"	: username,
			"email"		: email,
			"password"  : password,
			"mobile"    : mobile,
		},
		])
		print("Your data has been saved!.Thanks")
		return 1
	except:
		print("User already Registered")
		return 0
	

def check_if_present(user_table_name, username, password):
	db = client.temp
	print(str(username)+str(" ")+str(password))
	cursor = db[str(user_table_name)].find({"username":username, "password":password})
	print cursor
	if cursor.count() is not 0:
		print("yupiee")
		return 1
	else:
		print("here")
		return 0

def dropme(ch):
	client.drop_database(ch)

# insert_into_mongo("signup","yash agrawal","yash17ag","yash17agrawal@gmail.com","yash","9971910688")
