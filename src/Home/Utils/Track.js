import React, { useState } from "react";

function Track({ imageUrl, title, artist, toggleSelect, select }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  };

  return (
    <div>
      <img src={imageUrl}  alt="cover" />
      <p className="title">{title}</p>
      <p className="artist">{artist}</p>
        {isSelected? (
          <button onClick={handleToggleSelect} className="btn-selected">DESELECT</button>
      ) : <button onClick={handleToggleSelect} className="btn">SELECT</button> }
            
        </div>
  );
}

export default Track;
