import { useState } from 'react';
import PicGrid from './PicGrid';
import UserBio from './UserBio';
import './BioPics.css'

function BioPics ({user}) {

    const [mode, setMode] = useState('bio');

    const rightClick = e => {
      e.preventDefault();
      setMode('pics');
    }

    const leftClick = e => {
      e.preventDefault();
      setMode('bio');
    }


  return (
    <div className='bio-pics-holder'>
      <div className='left-slider-button' onClick={e => leftClick(e)}>
        {mode === 'pics' && <div className='left-arrow'></div>}
      </div>
      <div className='right-slider-button' onClick={e => rightClick(e)}>
        {mode === 'bio' && <div className='right-arrow'></div>}
      </div>
      <div className='bio-pics-slider' data-mode={mode}>
        <UserBio user={user} />
        <div className='pic-side'>
          <PicGrid user={user} />
          
        </div>
      </div>
    </div>
  )
}

export default BioPics;