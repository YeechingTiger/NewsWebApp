import requests
import json

NEWS_API_ENDPOINT = 'https://newsapi.org/v1/'
NEWS_API_KEY = '8b1d603f038b4f438757d01f59e10ab9'
ARTICALS_API = 'articles'
SORT_BY_TOP = 'top'
CNN = 'cnn'
DEFAULT_SOURCE = [CNN]

def buildUrl(end_point=NEWS_API_ENDPOINT, api_name=ARTICALS_API):
    return end_point + api_name

def getNewsFromSource(sources=DEFAULT_SOURCE, sortBy=SORT_BY_TOP):
    articles = []
    for source in sources:
        payload = { 'apikey': NEWS_API_KEY,
                    'source': source,
                    'sortBy': sortBy}
        response = requests.get(buildUrl(), params=payload)
        res_json = json.loads(response.content)

        # Extract info from response
        if (res_json is not None and
            res_json['status'] == 'ok' and
            res_json['source'] is not None):

            for news in res_json['articles']:
                news['source'] = res_json['source']

            articles.extend(res_json['articles'])
    return articles
