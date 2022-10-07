import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { async } from "@firebase/util";

export const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const slideLeft = () => {
    let slide = document.getElementById("slider");
    slide.scrollLeft = slide.scrollLeft - 500;
  };
  const slideLRight = () => {
    let slide = document.getElementById("slider");
    slide.scrollLeft = slide.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.saveMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovieShow = async (id) => {
    const results = movies.filter((movie) => movie.id !== id);
    await updateDoc(movieRef, {
      saveMovies: results,
    });
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className={
            "w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative group-hover:block"
          }
        >
          {movies.map((movie, id) => (
            <div
              key={id}
              className="w-1/2 inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {movie?.title}
                </p>
                <p
                  onClick={() => deleteMovieShow(movie.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideLRight}
          className="bg-white right-0 rounded-full absolute  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};
