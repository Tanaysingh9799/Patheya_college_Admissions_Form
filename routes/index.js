var express = require('express');
var createError = require('http-errors');
var path = require('path');
var _ = require('lodash');
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
const mysql = require('mysql2');
var router = express.Router();
var uid = (Math.floor(Math.random() * 1000) + 1000).toString().substring(1);
var connect = require('../Connection/connection');
const app = require('../app');
router.use(express.static(path.join(__dirname, 'public')));
adDate = moment().format('YYYY-MM-DD HH:mm:ss')

//GET ADMIN PAGE //
router.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/stylesheets/admin.html'));

})
/* GET LOGIN PAGE */
router.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '../public/stylesheets/done.html'));
})

// GET REGISTRATON PAGE///
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/stylesheets/index.html'));
});

//GET ALL STUDENTS//
router.get('/students',(req,res,result)=>{
  connect.query('SELECT * FROM students',(err,rows)=>{
      if(err){
          console.log(err)
      }
      else{
          res.send({ ALL_Students:rows})   
      }
  })
})


//POST STUDENTS DATA//
router.post("/students",bodyParser.json(),(req,res,)=>{
  let name = req.body.name
  let email =  req.body.email
  let age = req.body.age
  let gender = req.body.gender
  let password = req.body.password
  let phone = req.body.phone
  let department = req.body.department
  let cpassword = req.body.confirmpassword

if(password === cpassword){
 connect.query(`INSERT INTO students(uid, name , email, age , gender ,phone, password,department) VALUES(?,?,?,?,?,?,?,?)`,[uid,name,email,age,gender,phone,password,department],(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(rows)
      res.json({
        Admited_on:adDate,
        Name:req.body.name,
        Email:req.body.email,
        Department:req.body.department})
    }
  })
}
else{
  res.send(" Your Passwords does not match!  Please try again")
}
})

//DELETE STUDENTS BY ID //
router.delete('/del/:uid',(req,res)=>{
    connect.query('DELETE FROM students WHERE uid =?',[req.params.uid],(err,rows)=>{
      if (err)
    {
        console.log(err)
    }
      else 
    {
        console.log(rows) 
        res.send({Data_Deleted:rows})      
    }
  })
})


//GET STUDENTS BY ID//
router.get('/getbyid/:uid',(req,res)=>{
  connect.query('SELECT * FROM students WHERE uid =?',[req.params.uid],(err,rows)=>{
    try {
      console.log(rows)
      res.send(rows)
      
    } catch (error) {
      console.log(error)
    }
  })
})
//GET STUDENTS BY DEPT//
router.get('/getbyD/aero',(req,res)=>{
  connect.query((`SELECT * FROM students WHERE department = "Aeronautical Engineering"`),(err,rows)=>{
    if (err) {
      console.log(err)
    }
    console.log(rows)
    res.send(rows);  
  })
})

//GET STUDENTS BY DEPT//
router.get('/getbyD/civil',(req,res)=>{
  connect.query((`SELECT * FROM students WHERE department = "Civil Engineering"`),(err,rows)=>{
    if (err) {
      console.log(err)
    }
    console.log(rows)
    res.send(rows);  
  })
})
//GET STUDENTS BY DEPT//
router.get('/getbyD/mech',(req,res)=>{
  connect.query((`SELECT * FROM students WHERE department = "Mechanical Engineering"`),(err,rows)=>{
    if (err) {
      console.log(err)
    }
    console.log(rows)
    res.send(rows);  
  })
})

//GET STUDENTS BY DEPT//
router.get('/getbyD/chem',(req,res)=>{
  connect.query((`SELECT * FROM students WHERE department = "Chemical Engineering"`),(err,rows)=>{
    if (err) {
      console.log(err)
    }
    console.log(rows)
    res.send(rows);  
  })
})
//GET STUDENTS BY DEPT//
router.get('/groupby/dept',(req,res,result)=>{
  connect.query('SELECT * FROM students',(err,rows)=>{
      if(err){
          console.log(err)
      }
      else{
        result = _.groupBy(rows,"department")
          res.send({ ALL_Students:result})
          
      }
  
  })
})

//EDIT STUDENTS DATA//
router.put('/admin/edit/:uid',bodyParser.json(),(req,res)=>{
  let name = req.body.name
  let email =  req.body.email
  let age = req.body.age
  let gender = req.body.gender
  let password = req.body.password
  let phone = req.body.phone
  let department = req.body.department
  let uid = req.params.uid
  connect.query(`UPDATE students SET name =?, email =?, age=?, gender =?, phone =? , password =? ,department =?
  WHERE uid = ?`,[name,email,age,gender,phone,password,department],[uid],(err,rows)=>{
    if (err) {
      console.log(err)
    } else {
      console.log(rows)
      res.send(uid + " :Data Updated")
    } 
  })

})


module.exports = router;
