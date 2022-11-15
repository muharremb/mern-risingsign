import './PicsGrid.css';

function PicGrid ({user}) {

    const images = user.imageURLs || [];

  return (
    <div className='user-pics'>
        {images[0] && 
        <img src={images[0]} className="user-pics-grid-item"/> ||
        <div className="user-pics-grid-item"></div>}
        {images[1] && 
        <img src={images[1]} className="user-pics-grid-item"/>||
        <div className="user-pics-grid-item"></div>}
        {images[2] && 
        <img src={images[2]} className="user-pics-grid-item"/>||
        <div className="user-pics-grid-item"></div>}
        {images[3] && 
        <img src={images[3]} className="user-pics-grid-item"/>||
        <div className="user-pics-grid-item"></div>}
        {images[4] && 
        <img src={images[4]} className="user-pics-grid-item"/>||
        <div className="user-pics-grid-item"></div>}
        {images[5] && 
        <img src={images[5]} className="user-pics-grid-item"/>||
        <div className="user-pics-grid-item"></div>}
    </div>
  )
}

export default PicGrid;