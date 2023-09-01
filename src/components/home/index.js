import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./home.css" ;
import { useNavigate , Link} from 'react-router-dom'




const Homepage = () => {

  const[word , setWord] = useState("");
  const  navigate = useNavigate ();
  const handlesubmit = (event) => { 
    event.preventDefault();
    const trimedword = word.trim().toLowerCase();
    if(!trimedword || trimedword.split(' ').length > 1) return;
    navigate(`/search/${trimedword}`);
 }

  return (
    <div className='box'>
      <img className='image' 
      src='/photos/book.png' alt='book' />
      <div className='text-heading'>Dictionary</div>
      <div className='text-subheading' > Find meanings and save for quick refrence</div>
       <div className='searchbox'>
        < SearchIcon  className='searchtool'/>
        <form onSubmit={handlesubmit}>
        <input type='text' placeholder='search word'  className='searchvalue'
        value={word}
        onChange={ event => setWord(event.target.value)}
        >
      </input>
      </form>
        </div>
     <Link to ="/bookmarks" ><BookmarkIcon fontSize="medium" className='bookmarkicon' /></Link>
    </div>
  )
}

export default Homepage;