import React from "react";
import Title from "./Title";
import assets from "../assets/assets";

const OurWork = () => {
  const workData = [
    {
      image: assets.work_mobile_app,
      title: "Mobile app marketing",
      description:
        "We turn bold ideas into powerful digital solutions that connect, engage...",
    },
    {
      image: assets.work_dashboard_management,
      title: "Dashboard management",
      description: "We elp you execute your plan and deliver result.",
    },
    {
      image: assets.work_fitness_app,
      title: "Fitness app promotion",
      description:
        "We help you create a marketing strategy that drives result.",
    },
  ];

  return (
    <div
      id="our-work"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Our latest work"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workData.map((work, index) => (
          <div
            key={index}
            className="cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <img src={work.image} className="w-full rounded-xl" alt="" />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{work.title}</h3>
            <p className="w-5/6 text-sm opacity-60">{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWork;
