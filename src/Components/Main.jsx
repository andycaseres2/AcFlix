import React, { useState, useEffect } from "react";
import axios from "axios";
import { requests } from "../Requests";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => setMovies(response.data.results));
  }, []);

  const cutString = (str, num) => {
    if (str?.length > num) {
      return str?.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] text-white ">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[30%] py-4 px-12">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4 px-4">
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 font-semibold"
            >
              Play
            </button>
            <button className="border ml-4 text-white border-gray-300 py-2 px-5 font-semibold">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {cutString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};
