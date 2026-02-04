import React from "react";

export const Squeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse h-screen">
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>
      <div className=" bg-gray-200 rounded-md  w-full mb-4 h-6"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
