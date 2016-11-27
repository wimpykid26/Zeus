from pymongo import MongoClient
import pprint
import json
import unicodedata


def retrieve(id, category_article):
    links=[]
    category=[]
    client=MongoClient()
    db=client.mydb
    content=db.meta_data
    id=unicodedata.normalize('NFKD', id).encode('ascii','ignore')
    category_article=unicodedata.normalize('NFKD', category_article).encode('ascii','ignore')
    for i in content.find():
        if i['category'] == category_article and str(i['article_id']) == id:
            return i
