import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Error searching for movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.search.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
