import React from "react";
import Header from "../header";
import NavbarSearch from "../header/NavbarSearch";

export default function HomeNavbar() {
  return (
    <div>
      <Header />
      <div className="bg-white w-full">
        <h1 className="text-2xl text-center py-10">
          نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده
        </h1>
        <div className="w-full pb-12">
          <NavbarSearch />
        </div>
      </div>
    </div>
  );
}
