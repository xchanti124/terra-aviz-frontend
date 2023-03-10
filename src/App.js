import { NavLink, Route, Routes } from "react-router-dom";
import LocationsList from "./components/LocationsList";
import Location from "./components/Location";
import Error404 from "./components/Error404";
import LocationForm from "./components/LocationForm";
import About from "./components/About";
import styles from "./styles/app.module.css";

const App = () => (
  <>
    <nav className={styles.navigation}>
      <NavLink to={"/location_form"}>CREATE NEW LOCATION</NavLink>
      <NavLink to={"/"}>LOCATIONS</NavLink>
      <NavLink to={"/login"}>LOGIN</NavLink>
      <NavLink to={"/about"}>ABOUT</NavLink>
    </nav>

    <div className={styles.main}>
      <Routes>
        <Route path={"/"} element={<LocationsList />} />
        <Route path={"/details/:id"} element={<Location />} />
        <Route path={"/location_form"} element={<LocationForm />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/login"} element={<div>Login page</div>} />
        <Route path={"/404"} element={<Error404 />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </div>
  </>
);

export default App;
