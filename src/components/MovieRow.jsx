import React, { useState } from 'react';
import './MovieRow.css';

const MovieRow = ({ title, items, onMovieClick }) => {
  const [scrollX, setScrollX] = useState(0);

  const itemWidth = 150;
  const listWidth = items.results.length * itemWidth;
  const screenWidth = window.innerWidth;

  const btnEsquerda = () => {
    let x = scrollX + Math.round(screenWidth / 2);
    if (x > 0) x = 0;
    setScrollX(x);
  };

  const btndireito = () => {
    let x = scrollX - Math.round(screenWidth / 2);
    if (screenWidth - listWidth - 60 >= x) {
      x = screenWidth - listWidth - 60;
    }
    setScrollX(x);
  };

  const handleClick = (movie) => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow-listarea">
        <div className="btns">
          <button className="movieRow-left" onClick={btnEsquerda}></button>
          <button className="movieRow-right" onClick={btndireito}></button>
        </div>

        <div
          className="movieRow-list"
          style={{
            marginLeft: scrollX,
            width: listWidth,
            transition: 'margin 0.8s ease-in-out',
          }}
        >
          {items.results?.map((movie, key) => (
            <div
              className="movieRow-items"
              key={key}
              onClick={() => handleClick(movie)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.original_title || movie.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
