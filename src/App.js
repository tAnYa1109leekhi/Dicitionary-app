import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,
    Routes,  
    Route
  } from 'react-router-dom';
import Homepage from './components/home';
import Bookmark from './components/bookmark';
import Defination from './components/defination';
import { Grid } from '@material-ui/core';


const App = () => {
  const[ bookmark , setBookmark] =useState(JSON.parse(localStorage.getItem('bookmark'))|| {});
 useEffect(() => { 
  localStorage.setItem('bookmark' , JSON.stringify(bookmark))
 },[bookmark])
  const addBookmark = (word , definitions ) => setBookmark(oldBookmark => ({ ...oldBookmark ,
  [word] : definitions
  }))
 const removeBookmark = word => setBookmark(oldBookmark => { 
  const temp ={ ...oldBookmark}
  delete temp[word];
  return temp;
 })

  return (
    <div >
      <Grid >
     <Router>
      <Routes>
      <Route path ="/" element ={<Homepage />} />
      <Route path ="/bookmarks" element ={<Bookmark bookmark ={ bookmark} />} />
      <Route path ="/search/:word" element ={<Defination bookmark ={ bookmark} addBookmark ={addBookmark} removeBookmark ={removeBookmark} />} />
      </Routes>
     </Router>
      </Grid>
      
    </div>

  )
}

export default App;
