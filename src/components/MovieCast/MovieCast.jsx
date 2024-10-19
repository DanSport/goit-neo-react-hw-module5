import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCredits = async () => {
      const credits = await getMovieCredits(movieId);
      setCast(credits);
    };
    fetchCredits();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
            }
            alt={actor.name}
            width={100}
          />
          <p>
            {actor.name} as {actor.character}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
