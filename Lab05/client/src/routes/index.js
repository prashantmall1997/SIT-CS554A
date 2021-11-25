import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NewPost from "../Components/NewPost";
import UnsplashImages from "../Components/UnsplashImages";
import MyBin from "../Components/MyBin";
import MyPost from "../Components/MyPost";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route exact={true} path="/" element={<UnsplashImages />} />
      <Route exact={true} path="/my-bin" element={<MyBin />} />
      <Route exact={true} path="/my-posts" element={<MyPost />} />
      <Route exact={true} path="/new-post" element={<NewPost />} />
    </Routes>
  </Router>
);
