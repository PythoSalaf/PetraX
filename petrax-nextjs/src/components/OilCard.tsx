'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MarketData } from '@/types';
import { formatCurrency, formatOilQuantity, formatRelativeTime } from '@/utils';

type OilCardProps = MarketData;

const OilCard: React.FC<OilCardProps> = ({
  id,
  location,
  seller,
  quantity,
  icon,
  price,
  currency = 'USD',
  lastUpdated,
}) => {
  const router = useRouter();

  const handleBuyClick = () => {
    router.push(`/trading/${id}`);
  };

  return (
    <div className="card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          src={icon}
          alt={`${location} oil`}
          width={400}
          height={176}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {price && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md border"
               style={{
                 backgroundColor: 'var(--glass-bg)',
                 borderColor: 'var(--glass-border)',
                 color: 'var(--color-success)'
               }}>
            {formatCurrency(price, currency)}
          </div>
        )}

        {/* Status indicator */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full animate-pulse"
             style={{ backgroundColor: 'var(--color-success)' }}></div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h2
            className="text-lg font-semibold truncate flex-1 mr-2"
            title={location}
            style={{ color: 'var(--text-primary)' }}
          >
            {location}
          </h2>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></div>
            <span className="text-xs font-medium" style={{ color: 'var(--color-success)' }}>Live</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Seller</span>
            <span className="text-sm font-medium truncate max-w-[60%]"
                  title={seller}
                  style={{ color: 'var(--text-secondary)' }}>
              {seller}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Quantity</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {typeof quantity === 'string' ? quantity : formatOilQuantity(quantity)}
            </span>
          </div>

          {price && (
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Price/Barrel</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>
                {formatCurrency(price, currency)}
              </span>
            </div>
          )}

          {lastUpdated && (
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Updated</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {formatRelativeTime(lastUpdated)}
              </span>
            </div>
          )}
        </div>

        <div className="border-t pt-4" style={{ borderColor: 'var(--border-muted)' }}>
          <button
            onClick={handleBuyClick}
            className="btn btn-success w-full group"
          >
            <span>Buy Now</span>
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OilCard;
