import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default Router;
