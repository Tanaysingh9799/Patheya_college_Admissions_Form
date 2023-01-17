var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
var moment = require('moment-timezone');

const mysql = require('mysql2');

towDate = moment().format("mm")
indian = moment().tz("Asia/Calcutta|Asia/Kolkata").format();
//console.log(towDate);
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
  let phone = "0987654321"
  let password = "123321"
  let department = "CSE"
  let date = towDate
// connect.query(`INSERT INTO Tstudents(uid, name , email, age , gender ,phone, password,department,date) VALUES(?,?,?,?,?,?,?,?,?)`,[uid,name,email,age,gender,phone,password,department,date],(err,rows)=>{
  //  if(err){
  ////    console.log(err)
//}
   // else{
  //    console.log(rows)
   // }
 // })
