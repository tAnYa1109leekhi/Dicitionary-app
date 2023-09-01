import React from 'react'
import { Typography , IconButton, Box, } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./bookmarkss.css";
import { Link } from 'react-router-dom';



 

const Bookmark = ({bookmark}) => {
  
  return (
    <div>
      
      <div className='headingg'>
        <IconButton  to ="/" component ={Link}>
        <ArrowBackIcon  className='arrow'/>
        <Typography  variant='h5' >Bookmark</Typography> 
        </IconButton>
        
      </div>

    { 
    !!Object.keys(bookmark).length ?
    Object.keys(bookmark).map (b => 
      <Box key={b} component={Link} to ={`/search/${b}`} className='boxelement'>
       {b}
     </Box>)
    :<Typography  variant='h6'>No Bookmark</Typography> 
    }
      </div>
  )
}

export default Bookmark;