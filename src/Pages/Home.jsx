import React from "react";
import { Main } from "../Components/Main";
import { SlideMovies } from "../Components/SlideMovies";
import { requests } from "../Requests";

export const Home = () => {
  return (
    <>
      <Main />
      <SlideMovies
        slideId="1"
        title={"UpComing"}
        fetchUrl={requests.requestUpcoming}
      />
      <SlideMovies
        slideId="2"
        title={"Trending"}
        fetchUrl={requests.requestTrending}
      />
      <SlideMovies
        slideId="3"
        title={"Popular"}
        fetchUrl={requests.requestPopular}
      />
      <SlideMovies
        slideId="4"
        title={"Top Rated"}
        fetchUrl={requests.requestTopRated}
      />
      <SlideMovies
        slideId="5"
        title={"Horror"}
        fetchUrl={requests.requestHorror}
      />
    </>
  );
};
