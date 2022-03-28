import React from 'react';

const Playlist=({title,artist,img})=> {
    const handlePlay = () => {
    console.log("Selected");
    }
  return (
    <div className='Playlist'>
      <div className='pl-wrapper'>
        <img src={img} alt={title} className="img"/>

        <h3 className="pl-album">{title}</h3>
        <h3 className="pl-artist">{artist}</h3>
      </div>
      <div className='btn-wrapper'>
      <button className="btn-select" onClick={handlePlay}>Select</button>
      </div>
    
    </div>
  )
}
export default Playlist;