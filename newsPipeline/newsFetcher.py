#-*- coding: utf-8 -*-

import os
import sys

from newspaper import Article

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

import cnnNewsScraper
from cloudAMQP_client import CloudAMQPClient

SCRAPE_NEWS_TASK_CLOUDAMQP_URL = "amqp://fauunoyn:800kpt_abdmlYWMsVxJ8TjrzJf42s5vB@wasp.rmq.cloudamqp.com/fauunoyn"
SCRAPE_NEWS_TASK_CLOUDAMQP_NAME = "news-scrape-task-queue"
DEDUPE_NEWS_TASK_CLOUDAMQP_URL = "amqp://fauunoyn:800kpt_abdmlYWMsVxJ8TjrzJf42s5vB@wasp.rmq.cloudamqp.com/fauunoyn"
DEDUPE_NEWS_TASK_CLOUDAMQP_NAME = "news-dedupe-task-queue"

SLEEP_TIME_IN_SECONDS = 5

dedupe_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_CLOUDAMQP_URL, DEDUPE_NEWS_TASK_CLOUDAMQP_NAME)
scrape_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_CLOUDAMQP_URL, SCRAPE_NEWS_TASK_CLOUDAMQP_NAME)

def handle_message(msg):
    global dedupe_queue_client

    if msg is None or not isinstance(msg, dict):
        print 'message is broken'
        return

    task = msg

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text
    print task
    dedupe_queue_client.sendMessage(task)

while True:
    # Fetch message from queue
    print dedupe_queue_client
    if scrape_queue_client is not None:
        msg = scrape_queue_client.getMessage()
        print msg
        if msg is not None:

            try:
                handle_message(msg)
            except Exception as e:
                print e # coding=utf-8
                pass

        scrape_queue_client.sleep(SLEEP_TIME_IN_SECONDS / 2)
        dedupe_queue_client.sleep(SLEEP_TIME_IN_SECONDS / 2)
    # Handle message
