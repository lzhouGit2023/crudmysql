//import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
//import {Table,Button} from 'react-bootstrap';
import Axios from 'axios';//no{} !!
//import { response } from 'express';



function App() {
const [movieName,setmovieName] = useState("");
const [review,setReview] = useState("");
const [movieReviewList, setMovieList] = useState([]); //useState(''); is fatal!
const [newReview, setNewReview] = useState("");

useEffect( ()=>{
Axios.get('http://localhost:3001/api/get').then((response)=>{
 setMovieList(response.data) 
});

},[]);

const submitReview = ()=>{ //has = {}which is wrong
  Axios.post("http://localhost:3001/api/insert",
  {movieName: movieName,
    movieReview:review,})//.then(()=>{
      //alert("successful insert");  //});
   setMovieList( [
   ...movieReviewList, {movieName:movieName,movieReview: review},
   ] );

  };
const deleteReview = (movie) => {
  Axios.delete('http://localhost:3001/api/delete${movie}');   
}
const updateReview = (movie) => {
  Axios.put('http://localhost:3001/api/update',{
    movieName:movie,
    movieReview: newReview,
  }   );   
   setNewReview("");
}

return (
    <div className="App">
     <h1>CRUD MYSql</h1>
     <div className='form'>
         <label>Movie Name</label>
         <input type='text' name='movieName'
          onChange={(e)=>{
            setmovieName(e.target.value);
           }}
         />
         <label>Review</label>
         <input type='text' name='review' 
         onChange={(e)=>{
          setReview(e.target.value);
         }}/>
       <button onClick={submitReview}>Submit</button>
      {movieReviewList.map((val)=>{
      return (<h1> 
        MovieName: {val.movieName} | MovieReview: {val.movieReview} 
           </h1>
      
      );
    
    }
      )}

     </div>
    </div>
  ); 
}
export default App;
