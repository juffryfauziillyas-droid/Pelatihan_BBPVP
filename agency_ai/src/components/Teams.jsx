import React from "react";
import Title from "./Title";
import { teamData } from "../assets/assets";

const Teams = () => {
  return (
    <div className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white">
      <Title
        title="Meet the team"
        desc="A passionate team of digital expert dedicated to your brand success."
      />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {teamData.map((team, index) => (
          <div
            key={index}
            className="flex max-sm:flex-col items-center gap-5 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_0_30px_rgba(0,0,0,0.03)] transition-all duration-400 hover:scale-103"
          >
            <img
              src={team.image}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {team.name}
              </h3>
              <p className="text-xs text-gray-500 opacity-60">{team.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
