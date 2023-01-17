var express = require('express');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
const mysql = require('mysql2');
var router = express.Router();
var connect = require('../Connection/connection');
router.use(express.static(path.join(__dirname, 'public')));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/registered',(req,res)=>{
  connect.query([`SELECT uid,name,email,deparment`],()=>{
    res.render();
  })
})


router.get('/profile',(req,res)=>{
  email = atob(req.params.email);
  password = String(req.params.password);
connect.query(`SELECT * FROM students WHERE email =? AND password = ?`),[email,password],(err,rows)=>{
  if(err){
    console.log(err);
  }
  else{
    res.send(rows);
  }
}
})


module.exports = router;

