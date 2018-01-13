var express = require('express');
var router = express.Router();

console.log("index!!!");


/* GET home page. */
router.get('/', function(req, res, next) {  res.render('index', require('../models/index.js').data  );    });







/*
router.get('/android',         function(req, res, next) {  res.render('layouts/android.hbs', require('../models/android.js').data);   });
*/


module.exports = router;
