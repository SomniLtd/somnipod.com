var express = require('express');
var router = express.Router();


var host = router.get('host');

//console.log("host", host());






    /* SOMNIPOD.COM */
    router.get('/', function(req, res, next) {  res.render('layouts/index', require('../models/index.js').data  );    });
    router.get('/thanks', function(req, res, next) {  res.render('layouts/thanks'); });  // require('../models/thanks.js').data  );
    router.get('/somni-app', function(req, res, next) {  res.render('layouts/apps', require('../models/apps.js').data  );    });

    router.get('/frequently-asked-questions-about-somnipod', function(req, res, next) {  res.render('layouts/faq', require('../models/faq.js').data  );    });
    router.get('/what-happens-when-you-dont-get-enough-sleep', function(req, res, next) {  res.render('layouts/what-happens', require('../models/what-happens.js').data  );    });
    router.get('/sleep-and-your-performance', function(req, res, next) {  res.render('layouts/sleep-and-your-performance', require('../models/sleep-performance.js').data  );    });




    router.get('/blog', function(req, res, next) {
      var cosmic = require('cosmicjs')();
      var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });
      var prettyDate = (date) => new Date(date).toString().split(' ').slice(0, 4).join(' ').replace(/( \d+)$/, ',$1')


      bucket.getObjectsByType({type_slug: 'posts', sort: '-created_at'}).then(data => {
        for (i=0;i<data.total;i++){
          data.objects[i].createdNice = prettyDate(data.objects[i].created);
        }
        res.render('layouts/blog', data );
      }).catch(err => {
        err.status = 404;
        next(err);
      });
    });




    router.get('/:slug', function(req, res, next) {
      var cosmic = require('cosmicjs')();
      var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });
      var prettyDate = (date) => new Date(date).toString().split(' ').slice(0, 4).join(' ').replace(/( \d+)$/, ',$1')
      var slug = req.params.slug;

      bucket.getObject({
        slug: slug
      }).then(data => {

        console.log(data);
        data.object.createdNice = prettyDate(data.object.created);

        res.render('layouts/post', data );
      }).catch(err => {
        err.status = 404;
        next(err);
      })
    });



    router.get('/author/:slug', function(req, res, next) {
      var cosmic = require('cosmicjs')();
      var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });
      var prettyDate = (date) => new Date(date).toString().split(' ').slice(0, 4).join(' ').replace(/( \d+)$/, ',$1')
      var slug = req.params.slug;

      bucket.searchObjectType({type_slug: 'posts', metafield_key: "author", metafield_object_slug: slug, sort: '-created_at'}).then(data => {

        for (i=0;i<data.total;i++){
          data.objects[i].createdNice = prettyDate(data.objects[i].created);
        }
        res.render('layouts/author', data );
      }).catch(err => {
        err.status = 404;
        next(err);
      });

});



module.exports = router;
