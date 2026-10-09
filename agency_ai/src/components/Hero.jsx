import React from "react";
import assets from "../assets/assets";

const Hero = () => {
  return (
    <div
      id="hero"
      className="flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      <div className="inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full">
        <img className="w-20" src={assets.group_profile} alt="" />
        <p className="text-xs font-medium">Trusted by 10k+ people</p>
      </div>
      <div className="text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[23.75 px] max-w-5xl">
        Turning imagination into{" "}
        <span className="bg-linear-to-r from-primary to-[#4d8cea] bg-clip-text text-transparent">
          digital
        </span>{" "}
        impact.
      </div>
      <div className="text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-1g pb-3">
        Creating meaningful connections and turning big ideas into interactive
        digital experiences.
      </div>
      <div className="relative">
        <img src={assets.hero_img} alt="" className="w-full max-w-6xl" />
        <img
          src={assets.bgImage1}
          alt=""
          className="absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-10 dark:hidden"
        />
      </div>
    </div>
  );
};

export default Hero;
