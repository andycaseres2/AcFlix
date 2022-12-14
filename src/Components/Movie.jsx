import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const Movie = ({ movie }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovies = async () => {
    if (user?.email) {
      setLike(!like);
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
    <div className="w-1/2 md:w-1/3 lg:w-1/4 inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-sm font-bold flex justify-center items-center w-full h-full text-center whitespace-pre-wrap">
          {movie?.title}
        </p>

        <p onClick={saveMovies}>
          {like ? (
            <FaHeart
              onClick={() => setLike(!like)}
              className="absolute top-4 left-4 text-gray-300 !w-6 !h-6"
            />
          ) : (
            <FaRegHeart
              onClick={() => setLike(!like)}
              className="absolute top-4 left-4 text-gray-300 !w-6 !h-6"
            />
          )}
        </p>
      </div>
    </div>
  );
};
