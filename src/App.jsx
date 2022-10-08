import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { AuthContextProvider } from "./Context/AuthContext";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Account } from "./Pages/Account";
import { Signup } from "./Pages/Signup";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { DetailsMovie } from "./Components/DetailsMovie";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/movie/:id"} element={<DetailsMovie />} />
          <Route
            path={"/account"}
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
