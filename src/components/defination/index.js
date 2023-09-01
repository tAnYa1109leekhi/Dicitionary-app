import React, { Fragment, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import "./defination.css";
import { Box, Divider, Typography ,CircularProgress , Button, capitalize, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bookmark from '../bookmark';
import TurnedInIcon from '@mui/icons-material/TurnedIn';



const Definition = ({ 
  bookmark, addBookmark, removeBookmark
}) => {
const { word }= useParams();
const navigate = useNavigate();
const [definitions , setDefinitions ] = useState([])
const [loading , setLoading] = useState(true);
const [exit , setExit] = useState(true);
const [audio, setAudio] = useState(null)
const isbookmarked = Object.keys(bookmark).includes(word);


useEffect (()=>{ 
  
const fetchDefinition = async() => {
  try{
  const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
 setDefinitions(resp.data)
 const phonetics = resp.data[0].phonetics
 if(!phonetics.length) return;
 const url = phonetics[0].audio.replace('//ssl' , 'https://ssl');
 setAudio(new Audio(url));
 setLoading(false);
  } 
  catch(err)
  { 
    setExit(false);
  }
}


fetchDefinition();
},[])


if(!exit) return <Box className ='loader' >
  <Typography fontWeight={800} > Word not found </Typography>
  <Button  variant = "contained" sx={{ textTransform: 'capitalize' , mt : 4}} onClick={() => navigate(-1)}> Go back</Button>
  </Box>



if(loading) return <Box className ='loader'> <CircularProgress sx={{color : 'black'}} /></Box>
 return (
    <div >
     <div className='btnfortop' >
     <ArrowBackIcon onClick={() => navigate(-1)}  sx={{ color: 'black'}}/>
     <IconButton onClick={() => isbookmarked ? removeBookmark(word) : addBookmark(word, definitions) } >
    {isbookmarked ? <TurnedInIcon sx={{ color: 'black'}}/> :< BookmarkBorderIcon sx={{ color: 'black'}} />}
    </IconButton>
     </div>

  <div className='meaning-box'> 
  <Typography  variant="h4" fontWeight={500} >{ word }</Typography> 
 < VolumeUpIcon onClick={ ()=> audio.play()} fontSize='medium' className='btnforbox1' />
  </div>



{definitions.map((def, idx) =>
<Fragment key={idx} >
  <Divider  sx={{
    my:3,
    display: idx === 0 ? 'none ': 'block'
  }}/> 
   {def.meanings.map( meaning  => 
 <Box key={meaning.partOfSpeech} className ="indivdalbox"> 
 <Typography variant="subtitle1" fontWeight={800} color= "GrayText" sx={{textTransform : 'capitalize'}}>{meaning.partOfSpeech}</Typography>
 
 {meaning.definitions.map((definition , idx) => 
  <Typography className='sub-subtitle'
  key = {definition.definition}>
    {meaning.definitions.length > 1 && `${ idx + 1} . ` }
    {definition.definition}
  </Typography>
  )}

 </Box>
 )}
</Fragment>
   )}


    </div>
  )
}

export default Definition;