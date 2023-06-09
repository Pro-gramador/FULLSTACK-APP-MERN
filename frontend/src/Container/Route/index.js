import { BrowserRouter, Routes, Route, redirect} from "react-router-dom";
import { useState } from "react";

import HomePage from "../Home/index";
import AboutPage from "../About/index";
import MoviesPage from "../Movies/index";
import SeriesPage from "../TVSeries/index";
import DetailsPage from "../Details/index";
import RegisterForm from "../Authentication/Register";
import LoginForm from "../Authentication/Login";
import UserProfile from "../Authentication/UserProfile";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";



const RouterComponent = () => {
  const [ isLogged, setIsLogged] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>

          <Route path="/" element={<HomePage /> } />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/details/:movieid/:mediatype" element={<DetailsPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile/:userId" element={<UserProfile  />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
