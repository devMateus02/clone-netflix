import React from "react";
import './FeaturedMovie.css';

function FeaturedMovie({ item }) {
  const title = item.title || item.original_name || item.name;
  const releaseYear = item.release_date || item.first_air_date
    ? new Date(item.release_date || item.first_air_date).getFullYear()
    : 'Ano desconhecido';

  return (
    <section
      className="featured"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top"
      }}
    >
      <div className="logo"><img src="Netflix.png" alt="logo netflix" /></div>
      <div className="featured-vertical">
        <div className="featured-horizontal"></div>
      </div>

      <div className="featured-content">
        <h1>{title}</h1>

        <div className="featured-info">
          <p>{item.vote_average != null ? Number(item.vote_average).toFixed(1) : 'N/A'} pontos</p>
          <p>{releaseYear}</p>
          {item.number_of_seasons && (
            <p>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</p>
          )}
        </div>

        <p className="featured-descript">{item.overview}</p>

        <div className="featured-btn">
          <button><p>▶ Assistir</p></button>
          <button><p>+ Minha Lista</p></button>
        </div>

        <p className="generos">
          <span>Gêneros:</span> {item.genres?.map(g => g.name).join(', ') || 'Desconhecido'}
        </p>
      </div>
    </section>
  );
}

export default FeaturedMovie;
