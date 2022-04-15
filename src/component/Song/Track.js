import React, { useState } from "react";

function Track({ imageUrl, title, artist, toggleSelect }) {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleToggleSelect = () => {
      setIsSelected(!isSelected);
      toggleSelect();
    }
  
    return (
      <div className="playlist-card">
        <div className="playlist-card_image">
          <img src={imageUrl} alt={title} />
        </div>
  
        <div className="playlist-card_data">
          <div className="playlist-card_content">
            <h3 className="playlist-card_title">{title}</h3>
            <p className="playlist-card_artist">{artist}</p>
          </div>
  
          <div className="playlist-card_action">
            <button onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
          </div>
        </div>
      </div>
    );
  }

export default Track; 