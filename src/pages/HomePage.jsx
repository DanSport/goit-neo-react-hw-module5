import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
