import React from "react";

const selectedStyle = "ring-2 ring-red-500 bg-red-500 bg-opacity-10";
const unselectedStyle = "hover:bg-gray-100";

interface DifficultyCardProps {
  level: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

function DifficultyCard({
  level,
  description,
  selected,
  onSelect,
}: DifficultyCardProps) {
  return (
    <div
      className={`flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
      <h2
        className={`font-bold text-xl ${
          selected ? "text-red-500" : "text-black"
        }`}
      >
        {level}
      </h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default DifficultyCard;