from pymongo import MongoClient

MONGO_DB_HOST = 'localhost'
Mongo_DB_PORT = 27017
DB_NAME = 'news'

client = MongoClient("%s:%d" % (MONGO_DB_HOST, Mongo_DB_PORT))

def get_db(db=DB_NAME):
    db = client[db]
    return db
