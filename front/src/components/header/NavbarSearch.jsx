import React from "react";

const styleCheckBox =
  "col-span-1 active:rounded bg-white h-full border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition hover:cursor-pointer";

const styleCheckBoxCol2 =
  "col-span-2 active:rounded h-full bg-white border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition hover:cursor-pointer";

const inputStyle =
  "col-span-2 h-full border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition";

export default function NavbarSearch() {
  return (
    <div className="container flex flex-col mx-auto">
      <div className="h-16 grid grid-cols-6 gap-4">
        <input className={inputStyle} placeholder="جستجو در تمام آگهی ها" />
        <select className={`${styleCheckBox} text-gray-400`}>
          <option>تمام شهرها</option>
          <option>item 1</option>
          <option>item 1</option>
        </select>
        <select className={`${styleCheckBoxCol2} text-gray-400`}>
          <option>item 1</option>
          <option>item 1</option>
          <option>item 1</option>
        </select>
        <button className="h-full w-full bg-red-600 text-gray-50 rounded text-lg">
          جستجو
        </button>
      </div>
    </div>
  );
}
