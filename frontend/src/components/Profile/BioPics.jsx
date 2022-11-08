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
      <UserBio user={user} />
      <PicGrid user={user} />
    </div>
  )
}

export default BioPics;