#-*-coding:utf-8-*-

import datetime
import os
import sys

from dateutil import parser
from sklearn.feature_extraction.text import TfidfVectorizer

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_CLOUDAMQP_URL = "amqp://fauunoyn:800kpt_abdmlYWMsVxJ8TjrzJf42s5vB@wasp.rmq.cloudamqp.com/fauunoyn"
DEDUPE_NEWS_TASK_CLOUDAMQP_NAME = "news-dedupe-task-queue"

SLEEP_TIME_IN_SECONDS = 1

NEWS_TABLE_NAME = 'newslist'

SAME_NEWS_SIMILARITY_THRESHOLD = 0.8
# global cloudAMQP_Client
cloudAMQP_Client = CloudAMQPClient(DEDUPE_NEWS_TASK_CLOUDAMQP_URL, DEDUPE_NEWS_TASK_CLOUDAMQP_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict) :
        return
    task = msg
    text = str(task['text'].encode('utf-8'))
    if text is None:
        return

    # Get all recent news
    published_at = parser.parse(task['publishedAt'])
    published_at_day_begin = datetime.datetime(published_at.year, published_at.month, published_at.day, 0, 0, 0, 0)
    published_at_day_end = published_at_day_begin + datetime.timedelta(days=1)
    print published_at

    db = mongodb_client.get_db()
    recent_news_list = list(db[NEWS_TABLE_NAME].find({'publishedAt':{'$gte':published_at_day_begin, '$lt': published_at_day_end}}))
    print len(recent_news_list)
    if recent_news_list is not None and len(recent_news_list) > 0:
        documents = [str(news['text'].encode('utf-8')) for news in recent_news_list]
        documents.insert(0, text)

        #Similarity
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T

        print pairwise_sim.A
        rows, _ = pairwise_sim.shape

        for row in range(1, rows):
            if pairwise_sim[row, 0] > SAME_NEWS_SIMILARITY_THRESHOLD:
                print 'Duplicated news. Ignored!'
                return
    task['publishedAt'] = parser.parse(task['publishedAt'])
    db[NEWS_TABLE_NAME].replace_one({'digest': task['digest']}, task, upsert=True)

while True:
    if cloudAMQP_Client is not None:
        if cloudAMQP_Client is not None:
            msg = cloudAMQP_Client.getMessage()
        else:
            cloudAMQP_Client = CloudAMQPClient(DEDUPE_NEWS_TASK_CLOUDAMQP_URL, DEDUPE_NEWS_TASK_CLOUDAMQP_NAME)
            msg = cloudAMQP_Client.getMessage

        if msg is not None:
            try:
                handle_message(msg)
            except Exception as e:
                print e
                pass
        cloudAMQP_Client.sleep(SLEEP_TIME_IN_SECONDS)
