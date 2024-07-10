import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Test from "../pages/Test/Test";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/test" element={<Test />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default Router;
