import pyjsonrpc
import os
import sys
import json

from bson.json_util import dumps

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client

SERVER_HOST = 'localhost'
SERVER_PORT = 4041

class RequestHandler(pyjsonrpc.HttpRequestHandler):

	@pyjsonrpc.rpcmethod
	def add(self, a, b):
		return a + b

	@pyjsonrpc.rpcmethod
	def getNews(self):
		db = mongodb_client.get_db();
		news = list(db['newslist'].find())
		return json.loads(dumps(news))


http_server = pyjsonrpc.ThreadingHttpServer(
	server_address = (SERVER_HOST, SERVER_PORT),
	RequestHandlerClass = RequestHandler
)

print ("Starting HTTP server")

http_server.serve_forever()
