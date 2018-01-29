var express = require('express');
var router = express.Router();





//console.log("Cosmic:", cosmic);




router.get('/', function(req, res, next) {  res.render('layouts/index', require('../models/index.js').data  );    });
router.get('/yes', function(req, res, next) {  res.render('layouts/yes', require('../models/yes.js').data  );    });
router.get('/somni-app', function(req, res, next) {  res.render('layouts/apps', require('../models/apps.js').data  );    });

router.get('/frequently-asked-questions-about-somnipod', function(req, res, next) {  res.render('layouts/faq', require('../models/faq.js').data  );    });
router.get('/what-happens-when-you-dont-get-enough-sleep', function(req, res, next) {  res.render('layouts/what-happens', require('../models/what-happens.js').data  );    });
router.get('/sleep-and-your-performance', function(req, res, next) {  res.render('layouts/sleep-and-your-performance', require('../models/sleep-performance.js').data  );    });



router.get('/blog', function(req, res, next) {
  var cosmic = require('cosmicjs')();
  var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });

  bucket.getObjectsByType({type_slug: 'posts', sort: '-created_at'}).then(data => {
    res.render('layouts/blog', data );
  }).catch(err => {});
});




router.get('/:slug', function(req, res, next) {
  var cosmic = require('cosmicjs')();
  var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });
  var slug = req.params.slug;
  //console.log(req.params.slug);

  bucket.getObject({
    slug: slug
  }).then(data => {
    console.log(data)
    res.render('layouts/post', data );
  }).catch(err => {
    //var err = new Error('Not Found');
    err.status = 404;
    next(err);
  })

});



router.get('/author/:slug', function(req, res, next) {
  var cosmic = require('cosmicjs')();
  var bucket = cosmic.bucket({slug: "somnipod", read_key: "XWOgEUAxNUE1jDwKj0fLwNNBQCcZIWzjw4hqJRe9EYRQWHXvQY" });
  var slug = req.params.slug;

  bucket.searchObjectType({type_slug: 'posts', metafield_key: "author", metafield_object_slug: slug, sort: '-created_at'}).then(data => {
    res.render('layouts/author', data );
  }).catch(err => {});

});



/*
// Author Posts
app.get('/author/:slug', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response
    if (cosmic.objects.type.posts) {
      let author_posts = []
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at))
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date
        if (post.metadata.author.slug === req.params.slug) {
          res.locals.author = post.metadata.author
          author_posts.push(post)
        }
      })
      cosmic.objects.type.posts = author_posts
    } else {
      cosmic.no_posts = true
    }
    res.locals.author
    res.locals.cosmic = cosmic
    res.render('author.html', { partials })
  })
})
*/




module.exports = router;
