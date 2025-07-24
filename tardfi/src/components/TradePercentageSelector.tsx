import React, { useState, useCallback } from 'react';
import { TRADE_CONFIG } from '@/utils';

interface TradePercentageSelectorProps {
  onSelect?: (percentage: number) => void;
  disabled?: boolean;
  className?: string;
  selectedPercentage?: number;
}

const TradePercentageSelector: React.FC<TradePercentageSelectorProps> = ({
  onSelect,
  disabled = false,
  className = '',
  selectedPercentage
}) => {
  const [selected, setSelected] = useState<number | null>(selectedPercentage || null);

  const handleSelect = useCallback((percent: number) => {
    if (disabled) return;

    setSelected(percent);
    onSelect?.(percent);
  }, [disabled, onSelect]);

  // Use selected percentage from props if provided, otherwise use internal state
  const currentSelected = selectedPercentage !== undefined ? selectedPercentage : selected;

  return (
    <div className={`w-full ${className}`}>
      <h4 className="text-sm text-gray-300 mb-3">Quick Select</h4>
      <div className="flex justify-between gap-2">
        {TRADE_CONFIG.PERCENTAGE_OPTIONS.map((percent) => (
          <button
            key={percent}
            onClick={() => handleSelect(percent)}
            disabled={disabled}
            className={`
              px-2 md:px-3 py-2 rounded-lg text-sm border font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${currentSelected === percent
                ? 'bg-purple-600 text-white border-purple-600 focus:ring-purple-500'
                : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500 focus:ring-gray-500'
              }
              ${disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:scale-105'
              }
            `}
            aria-label={`Select ${percent} percent`}
          >
            {percent}%
          </button>
        ))}
      </div>

      {currentSelected && (
        <div className="mt-3 text-xs text-gray-400">
          Selected: {currentSelected}% of available balance
        </div>
      )}
    </div>
  );
};

export default TradePercentageSelector;
