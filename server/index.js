
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
host:  'localhost',
//port: '3306',
user : 'root',
password : 'God@2022',
database: 'lzhou',
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect,(err,result)=> {
    res.send(result);
    console.log(result);
  }
  )  
} );

app.get('/',(req,res)=>{ //can delete between here on test succ
const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('smurf','good movie')";                         
db.query(sqlInsert, (err,result)=>{
res.send("hello pedro. whats happen");

})

}); //guess 3001 is the server port and 3001 the client
 ///////////////now i use 1000 for everything..!!
app.post("/api/insert",(req,res) => {
const movieName = req.body.movieName;
const movieReview = req.body.movieReview;
    const sqlInsert =
"INSERT into movie_reviews(movieName, movieReview) VALUES (?,?);";
db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
  console.log(err);
});
});
app.delete("/api/delete/:movieName",(req,res) => {
   const name = req.params.movieName;
const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
 db.query(sqlDelete, name, (err,result) =>{
    if(err) console.log(err);
 });
  });
  app.put("/api/update",(req,res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
 const sqlUpdate = "UPDATE SET movie_reviews movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review,name], (err,result) =>{
     if(err) console.log(err);
  });
   }); 

app.listen(3001,()=>{    ///////////////////port

console.log("running on part 3001");
}); 
   