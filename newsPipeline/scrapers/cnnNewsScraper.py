import requests
import random
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from lxml import html

GET_CNN_NEWS_XPATH = '//p[@class="zn-body__paragraph speakable"]//text() | //div[@class="zn-body__paragraph"]//text()'
USER_AGENT_FILE = 'user-agents.txt'
USER_AGENTS = []

with open(USER_AGENT_FILE, "r") as uaf:
    for ua in uaf.readlines():
        if ua:
            USER_AGENTS.append(ua.strip()[0: -2])

random.shuffle(USER_AGENTS)

def getHeader():
    ua = random.choice(USER_AGENTS)
    headers = {
        "Connection": "close",
        "User-Agent": ua
    }
    return headers

def extract_news(new_url):
    # fetch html
    session_requests = requests.session()
    response = session_requests.get(new_url, headers=getHeader())
    # parse html
    news = {}
    try:
        tree = html.fromstring(response.content)
        news = tree.xpath(GET_CNN_NEWS_XPATH)
        news = ''.join(news)
    except Exception as e:
        print #coding-utf-8
        return {}
    return news
