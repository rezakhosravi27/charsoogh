import React from "react";
import { LoginIcon, BookmarkIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const UpHeaderItems = [
  {
    id: 1,
    name: "ورود / ثبت نام ",
  },
  {
    id: 2,
    name: "علاقه‌مندی ها",
  },
  {
    id: 3,
    name: "لیست آگهی‌ها",
  },
  {
    id: 4,
    name: "مستندات آموزشی",
  },
];

const UpHeaderItemsStyle =
  "text-slate-50 hover:cursor-pointer flex justify-center px-2 items-center text-xs h-full border-l-gray-500 border-l-2 hover:bg-gray-600 transition";

const renderUpHeaderItems = UpHeaderItems.map((item, index) => {
  return index === 0 ? (
    <li className={UpHeaderItemsStyle} key={item.id}>
      <LoginIcon className="h-full w-4 ml-1" />
      <Link to="/auth">{item.name}</Link>
    </li>
  ) : index === 1 ? (
    <li className={UpHeaderItemsStyle} key={item.id}>
      <BookmarkIcon className="h-full w-4" />
      {item.name}
    </li>
  ) : (
    <li
      className="text-slate-50 flex justify-center px-2 items-center text-xs h-full border-l-gray-500 border-l-2 hover:cursor-pointer hover:bg-gray-600 transition"
      key={item.id}
    >
      {item.name}
    </li>
  );
});

const UpHeader = () => {
  return (
    <div className="w-full bg-gray-800 text-slate-200 h-9">
      <div className="container mx-auto h-full flex justify-between">
        <ul className="flex justify-center items-center h-full">
          {renderUpHeaderItems}
        </ul>
        <button
          href="#"
          className="flex justify-center items-center h-full bg-red-600 px-3 text-white text-sm"
        >
          انتخاب شهر
        </button>
      </div>
    </div>
  );
};

export default UpHeader;
