import React from "react";

export default function LoadingSpiner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center">
        <div className="animate-bounce mr-2">
          <span className="font-bold text-3xl">Loading</span>
        </div>
        <div className="bg-green-600 h-10 w-10 rounded-full animate-pulse"></div>
        <div className="animate-bounce ml-2">
          <span className="font-bold text-3xl">KB</span>
        </div>
      </div>
    </div>
  );
}
