import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
/*const API_KEY = "ef7203e33711433e5b13eadf81519423";*/
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjcyMDNlMzM3MTE0MzNlNWIxM2VhZGY4MTUxOTQyMyIsIm5iZiI6MTcyOTM2MzE2My4yOTE5MzMsInN1YiI6IjY3MTNmYmFjYzZlMzA0MDk2MTk1ZjI2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ubk-yq3Nt2L4-JvMl8vUQ51ntFhQgYkdaBXLmHBTYcM";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
