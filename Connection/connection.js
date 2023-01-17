var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
const mysql = require('mysql2');


var uid = (Math.floor(Math.random() * 1000) + 1000).toString().substring(1);


/// Connected to the database//
const connect = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456654321',
    database:'form'
})
////////////////////////////////////////////////////////////////
connect.connect((error)=>{
    if(error){
      console.log("Unable to connect...")
    }
    else{
      console.log('Connected to the Database succesfully!')
    }
  })
  let name = "Tanay"
  let email = "tanay@gmail.com"
  let age = 25
  let gender = "male"
  let password = "123321"
// connect.query(`INSERT INTO students(uid, name , email, age , gender , password) VALUES(?,?,?,?,?,?)`,[uid,name,email,age,gender,password],(err,rows)=>{
  //  if(err){
    //  console.log(err)
    //}
    //else{
      //console.log(rows)
    //}
  //})

  module.exports = connect;