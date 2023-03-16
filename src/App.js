import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { isAuthenticated, logout } from "./helpers";
import LocationsList from "./components/LocationsList";
import Location from "./components/Location";
import Error404 from "./components/Error404";
import LocationForm from "./components/LocationForm";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";

import styles from "./styles/app.module.css";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(isAuthenticated());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav className={styles.navigation}>
        <NavLink to={"/about"}>ABOUT US</NavLink>
        <NavLink to={"/"}> LOCATIONS </NavLink>
        <NavLink to={"/location_form"}> ADD LOCATION </NavLink>
        {!isLoggedIn && <NavLink to={"/login"}> LOGIN </NavLink>}
        {isLoggedIn && (
          <NavLink
            to="#"
            onClick={() => {
              logout();
            }}
          >
            LOGOUT
          </NavLink>
        )}
      </nav>

      <div className={styles.main}>
        <Routes>
          <Route path={"/"}>
            <Route index element={<LocationsList />} />
            <Route path={"details"} element={<Location />} />
            <Route path={"location_form"} element={<LocationForm />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<Register />} />
            <Route path={"about"} element={<About />} />
          </Route>
          <Route path={"*"} element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
