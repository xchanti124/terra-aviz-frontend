import { NavLink, Route, Routes } from "react-router-dom";

import LocationsList from "./components/LocationsList";
import Location from "./components/Location";
import Error404 from "./components/Error404";
import LocationForm from "./components/LocationForm";

import styles from "./styles/app.module.css";

const App = () => (
  <>
    <nav className={styles.navigation}>
      <NavLink to={"/new_location"}> CREATE NEW LOCATION </NavLink>
      <NavLink to={"/"}> LOCATIONS </NavLink>
      <NavLink to={"/login"}> LOGIN </NavLink>
      <NavLink to={"/location_form"}> ADD LOCATION </NavLink>
    </nav>

    <div className={styles.main}>
      <Routes>
        <Route path={"/"}>
          <Route index element={<LocationsList />} />
          <Route path={"details"} element={<Location />} />
          <Route path={"location_form"} element={<LocationForm />} />
        </Route>
        {/* <Route path={"/new_location"} element={<LocationForm/>} /> */}
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </div>
  </>
);

export default App;
