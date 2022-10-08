import React, { useState, useEffect } from "react";
import axios from "axios";
import { requests } from "../Requests";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const Main = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

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
  const saveMovies = async (e) => {
    if (user?.email) {
      e.preventDefault();
      setSaved(true);
      await updateDoc(movieID, {
        saveMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
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
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 font-semibold hover:bg-transparent hover:text-white"
            >
              Play
            </button>
            <button
              onClick={saveMovies}
              className="border ml-4 text-white border-gray-300 py-2 px-5 font-semibold hover:bg-red-700"
            >
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
