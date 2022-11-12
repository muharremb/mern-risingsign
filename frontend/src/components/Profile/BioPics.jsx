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
      <div className='bio-pics-slider'>
        <UserBio user={user} />
        <PicGrid user={user} />
      </div>
    </div>
  )
}

export default BioPics;