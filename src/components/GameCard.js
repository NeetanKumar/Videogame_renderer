import React, { useState } from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, rating, summary, firstReleaseDate } = game.attributes;

  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <div className="game-card" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <div className="game-info">
        <h3 className="game-title">{name}</h3>
        <p className="game-release-date">Release Date: {new Date(firstReleaseDate).toLocaleDateString()}</p>
        <p className={`game-summary ${isHovered ? 'expanded' : ''}`}>
          {summary}
        </p>
      </div>
      <div className="game-rating">
        <span>{Math.round(rating)}</span>
      </div>
    </div>
  );
};

export default GameCard;
