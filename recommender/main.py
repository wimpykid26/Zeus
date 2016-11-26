import pymongo
from pymongo import MongoClient
from crawler import crawl
from similarity import similarity_list


links = []
category = []
client = MongoClient()
db = client.mydb
content = db.links

for i in content.find():
        url = str(i['link'])
        categ = str(i['category'])
        links.append(url)
        category.append(categ)

print (category)
#crawl(links, category)
for w in range(0, len(category)-1):
        print(category[w])
        similarity_list(category[w])
