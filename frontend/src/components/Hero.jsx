import React from "react";
import { assets, heroData } from "../assets/assets";

const Hero = () => {
  return (
    <div className="py-16 bg-[#f1f2f4]">
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* left section */}
        <div className="max-w-[450px] w-full flex flex-col px-4 gap-5">
          <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
            Find a job that suits your interest & skills.
          </h1>
          <p className="twxt-sm text-gray-700">
            Find your dream or hire top talent effortlessly with our job portal
            platform.
          </p>
        </div>
        {/* right section */}
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
      </div>
      {/* hero data section */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
        {heroData.map((item) => (
          <div
            key={item._id}
            className="bg-white w-[270px] h-[112px] flex items-center justify-center gap-4"
          >
            <img src={item.icon} alt="" />
            <div>
              <p className="text-center">{item.count}</p>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
