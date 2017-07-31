from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://fauunoyn:800kpt_abdmlYWMsVxJ8TjrzJf42s5vB@wasp.rmq.cloudamqp.com/fauunoyn"

TEST_QUEUE_NAME = 'TEST'

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)
    sentMSS = {"test": "DEMA"}
    client.sendMessage(sentMSS)
    client.sleep(10)
    receivedMsg = client.getMessage()
    print receivedMsg['test']

if __name__ == "__main__":
    test_basic()
