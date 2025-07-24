import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketData } from '@/types';
import { formatCurrency, formatOilQuantity, formatRelativeTime } from '@/utils';

interface OilCardProps extends MarketData {}

const OilCard: React.FC<OilCardProps> = ({
  id,
  location,
  seller,
  quantity,
  icon,
  price,
  currency = 'USD',
  lastUpdated
}) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/trade/${id}`);
  };

  return (
    <div className="w-[90%] mx-auto md:w-full border border-gray-800 shadow rounded-2xl hover:border-purple-500 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm">
      <div className="relative">
        <img
          src={icon}
          alt={`${location} oil`}
          className="w-full rounded-t-2xl h-44 object-cover"
        />
        {price && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            {formatCurrency(price, currency)}
          </div>
        )}
      </div>

      <div className="w-[94%] mx-auto py-3">
        <h2 className="text-base font-semibold text-white mb-2 truncate" title={location}>
          {location}
        </h2>

        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-x-1.5">
            <span className="text-gray-400">Seller:</span>
            <span className="truncate" title={seller}>{seller}</span>
          </div>

          <div className="flex items-center gap-x-1.5">
            <span className="text-gray-400">Quantity:</span>
            <span>{formatOilQuantity(quantity)}</span>
          </div>

          {price && (
            <div className="flex items-center gap-x-1.5">
              <span className="text-gray-400">Price:</span>
              <span className="font-semibold text-green-400">
                {formatCurrency(price, currency)}/barrel
              </span>
            </div>
          )}

          {lastUpdated && (
            <div className="flex items-center gap-x-1.5">
              <span className="text-gray-400">Updated:</span>
              <span className="text-xs">{formatRelativeTime(lastUpdated)}</span>
            </div>
          )}
        </div>

        <div className="w-full pt-4 pb-2">
          <button
            onClick={handleBuyClick}
            className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm w-full rounded-2xl py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OilCard;
