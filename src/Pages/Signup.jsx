import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/afc06103-4d6a-4236-b496-34b671a7e9ba/6a999933-7171-464f-8eef-735230054994/CO-en-20221003-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen "></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/60 text-white rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold pb-4">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full py-4 gap-5"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 bg-gray-500 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 bg-gray-500 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold px-8">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600 font-semibold">
                  <p>
                    <input className="mr-2" type="checkbox" /> Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8 font-semibold">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>
                  <Link className="ml-2" to={"/login"}>
                    Sing In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
