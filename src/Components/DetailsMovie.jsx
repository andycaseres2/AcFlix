import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requests } from "../Requests";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Footer } from "./Footer";

export const DetailsMovie = () => {
  const { id } = useParams();
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [detailsMovie, setDetailsMovie] = useState([]);
  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => setDetailsMovie(response.data.results));
  }, []);

  const saveMovies = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        saveMovies: arrayUnion({
          id: detailsMovie.id,
          title: detailsMovie.title,
          img: detailsMovie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  const details = detailsMovie.filter((movie) => movie.id === parseInt(id));
  const percentage = details[0]?.vote_average * 10;

  return (
    <>
      <div className="w-full h-full flex justify-center items-center mb-8">
        <div className="w-full h-full flex  px-4 md:px-8 py-4">
          <div className="mt-32 w-full flex flex-col md:flex-row gap-4 md:gap-8">
            <img
              className="w-full lg:!w-1/3 h-96 shadow-md rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${details[0]?.backdrop_path}`}
              alt={details[0]?.title}
            />

            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-white">
              <div className="flex gap-2 items-end">
                <h1 className="text-2xl md:text-3xl flex justify-center font-bold">
                  {details[0]?.title}
                </h1>
                <p className="text-lg  font-semibold">{`(${details[0]?.release_date})`}</p>
              </div>

              <div className="w-full h-max flex items-center justify-around gap-8 pr-4 md:pr-8">
                <section className=" w-full flex gap-2 items-center">
                  <label className="text-lg font-semibold">Language:</label>
                  <p className="h-8 w-8 border border-white flex justify-center text-xl font-semibold">
                    {details[0]?.original_language}
                  </p>
                </section>

                <section className="flex items-center justify-center gap-2 w-full h-full">
                  <label className="text-lg font-semibold">
                    Puntuación de usuario:
                  </label>
                  <div className="w-28 h-28 flex">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                    />
                  </div>
                </section>

                <div className="w-full flex justify-end">
                  <p onClick={saveMovies}>
                    {like ? (
                      <FaHeart
                        onClick={() => user?.email && setLike(!like)}
                        className=" text-gray-300 !w-10 !h-10"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => user?.email && setLike(!like)}
                        className=" text-gray-300 !w-10 !h-10"
                      />
                    )}
                  </p>
                </div>
              </div>

              <section className="flex flex-col gap-2">
                <h3 className=" text-2xl font-bold">Vista General</h3>
                <p className="">{details[0]?.overview}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer arrow={true} />
    </>
  );
};
