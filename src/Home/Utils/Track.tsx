import React, { useState } from "react";

interface Props {

  title: string;
  artist: string;
  imageUrl: string;
  toggleSelect: () => void;
  select: boolean;
}

const Track: React.FC<Props> = ({ imageUrl, title, artist, toggleSelect, select }) => {
  const [isSelected, setIsSelected] = useState<Boolean>(select);

  const handleToggleSelect: ()=> void = ()=> {
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
