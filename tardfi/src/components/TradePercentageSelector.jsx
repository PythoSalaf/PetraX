import React, { useState } from "react";

const percentages = [10, 25, 50, 75, 100];

const TradePercentageSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (percent) => {
    setSelected(percent);
    onSelect(percent);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 mt-4">
        {percentages.map((percent) => (
          <button
            key={percent}
            onClick={() => handleSelect(percent)}
            className={`px-2 md:px-3 py-1 rounded-md text-sm border ${
              selected === percent
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-gray-800 text-white border-gray-600"
            } transition-all duration-150`}
          >
            {percent}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default TradePercentageSelector;
