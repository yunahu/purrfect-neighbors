import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import Home from "../pages/Home/Home";
import Messages from "../pages/Messages";
import Pet from "../pages/Pet";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import ShareItems from "../pages/ShareItems";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";

const Router = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Navigate replace to="/explore" />} />
      <Route path="/explore" element={<Home />} />
      <Route path="/pet/:id" element={<Pet />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route path="/share" element={<ShareItems />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  </Routes>
);

export default Router;
