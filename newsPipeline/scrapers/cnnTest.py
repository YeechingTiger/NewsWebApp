import cnnNewsScraper as scraper

CNN_NEWS_URL = "http://www.cnn.com/2017/07/29/politics/trump-china-north-korea-tweet/index.html"

def test():
    news = scraper.extract_news(CNN_NEWS_URL)
    print news

if __name__ == "__main__":
    test()
