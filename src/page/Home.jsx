import React, { useEffect, useState } from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";
import Tmdb from "../services/tmdb"
import "./Home.css"

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      // Destaque inicial
      const originals = list.find(l => l.slug === 'originals');
      const randomChosen = originals.items.results[Math.floor(Math.random() * originals.items.results.length)];
      const chosenInfo = await Tmdb.getMovieInfo(randomChosen.id, 'tv');
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  const handleMovieClick = async (movie) => {
    const type = movie.first_air_date ? 'tv' : 'movie';
    const info = await Tmdb.getMovieInfo(movie.id, type);
    setFeaturedData(info);
  };

  return (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      {movieList.map((category, key) => (
        <MovieRow
          key={key}
          title={category.title}
          items={category.items}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};

export default Home;
