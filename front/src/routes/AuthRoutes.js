import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../components/auth";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<Login />} />
        <Route path="signUp" element={<Signup />} />
      </Route>
    </Routes>
  );
}
