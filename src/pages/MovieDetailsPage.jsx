import { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMovieDetails } from "../services/api";
import Loader from "../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLink.current);
  };

  if (loading) {
    return <Loader />;
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <h2>{movie.title}</h2>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
        }
        width={250}
        alt="poster"
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <Link to="cast" state={{ from: backLink.current }}>
        Cast
      </Link>
      <Link to="reviews" state={{ from: backLink.current }}>
        Reviews
      </Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
