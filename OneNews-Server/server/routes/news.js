var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res) {
  let news = [
      {
          'author': "Rachel Kaser",
          'title': "This trippy Major Lazer music video lets you choose your own adventure",
          'description': "Major Lazer today released an interactive video for their new single \"No Know Better.\" The video allows the viewer to take part in the video, albeit in a very limited way.\r\n\r\nIn ...",
          'url': "https://thenextweb.com/video/2017/07/27/trippy-major-lazer-music-video-lets-choose-adventure/",
          'urlToImage': "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/07/Major-Lazer-Eko.jpg",
          'publishedAt': "2017-07-27T23:49:38Z",
          'source': 'cnn',
          'reason': 'Recommend',
          'digest': "sadasdsadsa"
      },
      {
          'author': "Rachel Kaser2",
          'title': "This trippy Major Lazer music video lets you choose your own adventure",
          'description': "Major Lazer today released an interactive video for their new single \"No Know Better.\" The video allows the viewer to take part in the video, albeit in a very limited way.\r\n\r\nIn ...",
          'url': "https://thenextweb.com/video/2017/07/27/trippy-major-lazer-music-video-lets-choose-adventure/",
          'urlToImage': "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/07/Major-Lazer-Eko.jpg",
          'publishedAt': "2017-07-27T23:49:38Z",
          'source': 'cnn',
          'reason': 'Recommend',
          'digest': "sadasdsadsa"
      }
  ];

  res.json(news);
});

module.exports = router;
