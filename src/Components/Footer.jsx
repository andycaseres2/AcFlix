import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineArrowUp,
} from "react-icons/ai";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
    /* you can also use 'auto' behaviour
         in place of 'smooth' */
  });
};

export const Footer = () => {
  return (
    <div className="h-44 w-full mt-6 bg-black relative ">
      <div className={"flex gap-4 p-4"}>
        <AiOutlineInstagram className="h-10 w-10 fill-white hover:scale-110 ease-in-out duration-300 cursor-pointer" />
        <AiOutlineTwitter className="h-10 w-10 fill-white hover:scale-110 cursor-pointer ease-in-out duration-300" />
        <AiFillLinkedin className="h-10 w-10 fill-white hover:scale-110 cursor-pointer ease-in-out duration-300" />
      </div>
      <AiOutlineArrowUp
        onClick={() => scrollToTop()}
        className="h-10 w-10 absolute top-4 right-4 fill-white animate-bounce cursor-pointer"
      />
    </div>
  );
};
