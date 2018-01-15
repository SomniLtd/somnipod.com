var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  res.render('index', require('../models/index.js').data  );    });

router.get('/success', function(req, res, next) {  res.render('index', require('../models/success.js').data  );    });


module.exports = router;
