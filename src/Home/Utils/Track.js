import React, { useState } from "react";

const Track =({ imageUrl, title, artist, toggleSelect, select }) => {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  };

  return (
    <div className="song-container">
      <div>
        <img src={imageUrl} alt="cover" />
      </div>
      <div className="info-container">
        <div className="info-wrapper">
          <p className="title">{title}</p>
          <p className="artist">{artist}</p>
        </div>
        <div>
          {isSelected ? (
            <button onClick={handleToggleSelect} className="btn-selected">
              DESELECT
            </button>
          ) : (
            <button onClick={handleToggleSelect} className="btn">
              SELECT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Track;
