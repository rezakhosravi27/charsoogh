import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Header from "../header";

export default function index() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-32 my-20">
        <div className="grid grid-cols-2 gap-8">
          <Login />
          <Signup />
        </div>
      </div>
    </>
  );
}
