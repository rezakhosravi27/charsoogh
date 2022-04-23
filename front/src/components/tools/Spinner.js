import React from "react";

export default function Spinner({ color, height, width }) {
  console.log("spinner component rendered");
  return (
    <div
      className={`rounded-full animate-spin border-l-3  border-r-2 border-b-2 border-${color} h-${height} w-${width}`}
    ></div>
  );
}
