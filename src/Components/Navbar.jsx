import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex py-4 px-8 z-[100] w-full items-center justify-between absolute">
      <Link to={"/"}>
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer ">
          AcFlix
        </h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to={"/account"}>
            <button className="text-white pr-4 font-semibold">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 font-semibold rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <button className="text-white pr-4 font-semibold">Sing in</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-red-600 px-6 py-2 font-semibold rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
