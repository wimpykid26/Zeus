#import pymongo
from pymongo import MongoClient
import pprint
import json

links=[]
category=[]
client=MongoClient()
db=client.mydb
content=db.content
id = 0
for i in content.find({"category":"sports"}):
	f = open('/home/mera_naam_dwaipayan/Dwaipayan/Zeus/src/client/json/' + 'sports.json', 'a')
	print(i)
	i['id'] = id
	id = id + 1
	i['upvotes'] = 0
	i['downvotes'] = 0
	del i['_id']
	json.dump(i, f)
	#f.write(str(i))
	f.close()
