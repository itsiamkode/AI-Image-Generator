import React, { useEffect } from "react";
import MasnoryGrid from "./MasnoryGrid";
export default function LandingPage() {


  return (
    <div className="md:container mx-auto mt-18 px-3 min-h-max">
      <div className="text-white w-[100%] md:text-6xl xxs:text-4xl sm:text-4xl text-center md:leading-17 xxs:leading:15 sm:leading:15 tracking-tight font-[600] font-poppins">
        Unleash Your{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Creativity
        </span>{" "}
        with <br className="sm:hidden md:block xxs:hidden" /> the Power of{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          AI
        </span>
      </div>
      <div className="text-[#C4C5C5] md:text-xl  text-center mt-4">
        Effortlessly create stunning visuals from your ideas.
      </div>
      <div className="border-1 border-[#c4c5c5] mt-6 rounded-lg flex gap-5 items-center md:w-[700px] mx-auto px-3 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
        >
          <g fill="#c4c5c5" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M10.5 5.5a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-6.5 5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" />
            <path d="M14.47 14.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06" />
          </g>
        </svg>
        <input
          type="text"
          placeholder="Search with prompt or name..."
          className="bg-transparent text-lg w-[100%] placeholder:text-[#c4c5c5] outline-none text-white"
        />
      </div>
      <div className="text-[#fff] mb-10 md:text-4xl xxs:text-2xl sm:text-2xl text-center font-[600] font-poppins mt-9">
        Latest{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Generated
        </span>{" "}
        AI Images
      </div>
     <MasnoryGrid/>
    </div>
  );
}
