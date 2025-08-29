import React from "react";
import { howWorks } from "../assets/assets";

const HowWorks = () => {
  return (
    <div className="py-16 bg-[#f1f2f4]">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-800 text-center">
        How JobPilot Works
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 items-center justify-center">
        {howWorks.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-center gap-4"
          >
            <img src={item.icon} alt="" />
            <div className="flex flex-col items-center justify-center text-gray-800">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
