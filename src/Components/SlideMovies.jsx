import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const SlideMovies = ({ title, fetchUrl, slideId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);

  const slideLeft = () => {
    let slide = document.getElementById("slider" + slideId);
    slide.scrollLeft = slide.scrollLeft - 500;
  };
  const slideLRight = () => {
    let slide = document.getElementById("slider" + slideId);
    slide.scrollLeft = slide.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4 ml-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + slideId}
          className={
            "w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative group-hover:block"
          }
        >
          {movies.map((movie, id) => (
            <Movie key={id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideLRight}
          className="bg-white right-0 rounded-full absolute  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};
