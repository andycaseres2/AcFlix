import React from "react";
import { Footer } from "../Components/Footer";
import { SavedShows } from "../Components/SavedShows";

export const Account = () => {
  return (
    <>
      <div className="w-full text-white h-[400px]">
        <img
          className=" w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/afc06103-4d6a-4236-b496-34b671a7e9ba/6a999933-7171-464f-8eef-735230054994/CO-en-20221003-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
      <Footer arrow={true} />
    </>
  );
};
