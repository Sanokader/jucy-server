const express = require('express');
const app=express();
const db=require('./config/db.js');
const cors = require('cors')
require('dotenv').config();


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

app.use(express.json())
app.use(cors());

app.get("/api/get",(req,res) => {
  db.query(
    "SELECT * FROM posts",(err,result) => {
      if(err){
        console.log(err);
      }
      res.send(result)
    }
  )
})

app.get("/api/getFromId/:id",(req,res) => {
  db.query(
    "SELECT * FROM posts WHERE id=?",req.params.id,(err,result) => {
      if(err){
        res.send(err)
      }
      res.send(result)
    }
  )
})

app.post("/api/create",(req,res) => {
  const userName = req.body.userName;
  const title= req.body.title;
  const text = req.body.text;
  db.query(
    "INSERT INTO posts (title,user_name,post_text) VALUES (?,?,?)",[title,userName,text],
    (err,result) => {
      if(err){
        console.log(err);
      }else{
        console.log(result);
      }
    }
  )
})

app.listen(process.env.PORT,() => {
  console.log(`Server running on port ${PORT}`);
})