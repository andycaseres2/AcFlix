import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requests } from "../Requests";

export const DetailsMovie = () => {
  const { id } = useParams();
  const [detailsMovie, setDetailsMovie] = useState();
  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => setDetailsMovie(response.data.results))
      .error((error) => alert(error.message));
  }, []);

  console.log(detailsMovie);

  const showDetailsMovie = detailsMovie.filter(
    (detailsMovie) => detailsMovie.id === parseInt(id)
  );
  console.log(showDetailsMovie);
  return (
    <>
      <div className="w-full text-white h-[400px]">
        <img
          className=" w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500/${showDetailsMovie?.backdrop_path}`}
          alt={showDetailsMovie?.title}
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {showDetailsMovie[0]?.title}
          </h1>
        </div>
      </div>
    </>
  );
};
