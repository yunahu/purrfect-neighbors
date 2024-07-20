import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import Home from "../pages/Home/Home";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import ShareItems from "../pages/ShareItems";
import SignIn from "../pages/SignIn/SignIn";
import Product from "../pages/Product"

const Router = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Navigate replace to="/explore" />} />
      <Route path="/explore" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/share" element={<ShareItems />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts/:id" element={<Product />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  </Routes>
);

export default Router;
