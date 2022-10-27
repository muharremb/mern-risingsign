import { useState } from 'react';
import PicGrid from './PicGrid';
import UserBio from './UserBio';
import './BioPics.css'

function BioPics ({user}) {

    const [mode, setMode] = useState('bio');

    const handleClick = () => {
        setMode(mode === 'bio' ? 'pics' : 'bio');
    }


  return (
    <div className='bio-pics-holder'>
        {mode === 'bio' &&
        <UserBio user={user} />}
        {mode === 'pics' && 
        <PicGrid user={user} />}
        <button id="bio-pics-switch" onClick={handleClick}>{mode === 'bio' ? 'View Pics' : 'View Bio'}</button>
    </div>
  )
}

export default BioPics;