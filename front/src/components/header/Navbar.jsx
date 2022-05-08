import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const navItems = [
  {
    id: 1,
    name: "صفحه اصلی",
  },
  {
    id: 2,
    name: "دسته آگهی‌ها",
  },
  {
    id: 3,
    name: "وبلاگ",
  },
  {
    id: 4,
    name: "نقشه آگهی",
  },
  {
    id: 5,
    name: "درباره ما",
  },
  {
    id: 6,
    name: "تماس با ما",
  },
];

export default function Navbar() {
  const [active, setActive] = React.useState(0);

  const renderNavItems = navItems.map((item, index) => {
    return index === 0 ? (
      <li
        key={index}
        className={`p-2 flex items-center hover:bg-red-500 mx-1 hover:text-gray-100 rounded transition hover:cursor-pointer text-sm ${
          index === active ? "bg-red-600 text-gray-100 " : "null"
        }`}
        onClick={() => setActive(index)}
      >
        <Link to="/">{item.name}</Link>
        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
      </li>
    ) : index === 1 ? (
      <li
        key={index}
        className={`p-2 flex items-center hover:bg-red-500 mx-1 hover:text-gray-100 rounded transition hover:cursor-pointer text-sm ${
          index === active ? "bg-red-600 text-gray-100 " : "null"
        }`}
        onClick={() => setActive(index)}
      >
        {item.name}
        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
      </li>
    ) : (
      <li
        className={`p-2 hover:bg-red-500 mx-1 hover:text-gray-100 rounded transition hover:cursor-pointer text-sm ${
          index === active ? "bg-red-600 text-gray-100 " : "null"
        }`}
        onClick={() => setActive(index)}
        key={index}
      >
        {item.name}
      </li>
    );
  });

  return (
    <nav className="container border-b-2 border-b-gray-200 flex mx-auto h-15 py-8">
      <div className="w-fit md:ml-10 flex h-full justify-center items-center">
        <img
          className="h-full w-44"
          src="/images/headerImages/logo.png"
          alt="charsooghLogo"
        />
      </div>
      <div className="w-2/3">
        <ul className="flex items-center h-full">{renderNavItems}</ul>
      </div>
      <div className="w-1/4 flex justify-end items-center">
        <button className="text-sm ml-2 items-center transition hover:text-gray-100 hover:bg-red-500 border-red-600 text-red-600 rounded px-4 py-2 border-2 flex">
          <PlusIcon className="w-3 h-3 mx-1" />
          دسته‌بندی‌ها
        </button>
        <button className="text-sm text-red-600 border-red-600 flex items-center transition hover:text-gray-100 hover:bg-red-500 rounded px-4 py-2 border-2">
          <PlusIcon className="w-3 h-3 mx-1" />
          ثبت اگهی رایگان
        </button>
      </div>
    </nav>
  );
}
