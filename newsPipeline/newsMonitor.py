#-*-coding:utf-8-*-
import os
import redis
import sys
import hashlib
import datetime

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import newsApiClient
from cloudAMQP_client import CloudAMQPClient

REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_TIMEOUT = 3600*24

SLEEP_TIME_IN_SECONDS = 10

SCRAPE_NEWS_TASK_CLOUDAMQP_URL = "amqp://fauunoyn:800kpt_abdmlYWMsVxJ8TjrzJf42s5vB@wasp.rmq.cloudamqp.com/fauunoyn"
SCRAPE_NEWS_TASK_CLOUDAMQP_NAME = "news-scrape-task-queue"

NEWS_SOURCE = [
 'cnn',
 'bbc-news',
 'bloomberg',
 'cnbc',
 'espn',
 'google-news',
 'ign',
 'nfl-news',
 'the-wall-street-journal',
 'the-washington-post',
 'time',
 'usa-today',
 'bbc-sport',
 'buzzfeed',
 'entertainment-weekly',
 'focus',
 'fortune',
 'fox-sports',
 'hacker-news',
 'independent'

]

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_CLOUDAMQP_URL, SCRAPE_NEWS_TASK_CLOUDAMQP_NAME)

while True:
    newsList = newsApiClient.getNewsFromSource(NEWS_SOURCE)

    num_of_new_news = 0

    for news in newsList:
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if redis_client.get(news_digest) is None:
            num_of_new_news = num_of_new_news + 1
            news['digest'] = news_digest

            if news['publishedAt'] is None:
                news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

            redis_client.set(news_digest, news)
            redis_client.expire(news_digest, REDIS_TIMEOUT)

            cloudAMQP_client.sendMessage(news)
    print 'Fetched %d new news' % num_of_new_news

    cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)
