import React from "react";

const Track = ({title, artist, url}) => {
    const handlePlay = ()=> {
        console.log("Selected");
    }

    return(
        <div className="track-container">
            <div>
                <img src={url} alt="cover" />
            </div>
            <div className="song-container">
                <div className="song-wrapper">
                    <p className="title">{title}</p>
                    <p className="artist">{artist}</p>
                </div>
                <div className='btn-wrapper'>
                  <button className="btn-select" onClick={handlePlay}>Select</button>
                </div>  
            </div>
        </div>
    )
}

export default Track;