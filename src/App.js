import { NavLink, Route, Routes } from "react-router-dom";

import LocationsList from "./components/LocationsList";
import Location from "./components/Location";
import Error404 from "./components/Error404";

const App = () => (
  <>
    <nav>
      <NavLink to={"/new_location"}> CREATE NEW LOCATION </NavLink>
      <NavLink to={"/"}> LOCATIONS </NavLink>
      <NavLink to={"/login"}> LOGIN </NavLink>
    </nav>

    <Routes>
      <Route path={"/"}>
        <Route index element={<LocationsList />} />
        <Route path={"details"} element={<Location />} />
      </Route>
      {/* <Route path={"/new_location"} element={<LocationForm/>} /> */}

      <Route path={"*"} element={<Error404 />} />
    </Routes>
  </>
);

export default App;
