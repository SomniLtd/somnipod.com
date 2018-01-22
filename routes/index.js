var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  res.render('layouts/index', require('../models/index.js').data  );    });

router.get('/yes', function(req, res, next) {  res.render('layouts/yes', require('../models/yes.js').data  );    });

router.get('/blog', function(req, res, next) {  res.render('layouts/blog', require('../models/blog.js').data  );    });

module.exports = router;
