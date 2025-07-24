import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { ChartData } from '@/types';
import { CHART_CONFIG } from '@/utils';

interface ChartProps {
  data?: ChartData[];
  height?: number;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  height = CHART_CONFIG.DEFAULT_HEIGHT,
  className = ''
}) => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Default chart data
  const defaultData: ChartData[] = [
    { time: '2024-06-11', open: 71, high: 75, low: 69, close: 74 },
    { time: '2024-06-12', open: 74, high: 76, low: 72, close: 70 },
    { time: '2024-06-13', open: 70, high: 73, low: 68, close: 71 },
    { time: '2024-06-14', open: 71, high: 74, low: 69, close: 70 },
    { time: '2024-06-15', open: 70, high: 72, low: 67, close: 68 },
    { time: '2024-06-16', open: 68, high: 71, low: 66, close: 69 },
    { time: '2024-06-17', open: 69, high: 73, low: 68, close: 72 },
    { time: '2024-06-18', open: 72, high: 75, low: 70, close: 74 },
    { time: '2024-06-19', open: 74, high: 76, low: 71, close: 72 },
    { time: '2024-06-20', open: 72, high: 74, low: 69, close: 70 },
    { time: '2024-06-21', open: 70, high: 73, low: 68, close: 71 },
    { time: '2024-06-22', open: 71, high: 74, low: 70, close: 73 },
    { time: '2024-06-23', open: 73, high: 75, low: 72, close: 70 },
    { time: '2024-06-24', open: 70, high: 71, low: 66, close: 68 },
    { time: '2024-06-25', open: 68, high: 72, low: 67, close: 71 },
    { time: '2024-06-26', open: 71, high: 75, low: 70, close: 74 },
    { time: '2024-06-27', open: 74, high: 76, low: 73, close: 75 },
    { time: '2024-06-28', open: 75, high: 77, low: 72, close: 73 },
    { time: '2024-06-29', open: 73, high: 74, low: 70, close: 71 },
    { time: '2024-06-30', open: 71, high: 74, low: 69, close: 72 },
  ];

  const chartData = data || defaultData;

  useEffect(() => {
    if (!chartContainer.current) return;

    try {
      // Create chart
      const chart = createChart(chartContainer.current, {
        width: chartContainer.current.clientWidth,
        height,
        layout: {
          background: { color: CHART_CONFIG.COLORS.BACKGROUND },
          textColor: CHART_CONFIG.COLORS.TEXT,
        },
        grid: {
          vertLines: { color: CHART_CONFIG.COLORS.GRID },
          horzLines: { color: CHART_CONFIG.COLORS.GRID },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          borderColor: CHART_CONFIG.COLORS.BORDER,
        },
        rightPriceScale: {
          borderColor: CHART_CONFIG.COLORS.BORDER,
        },
        crosshair: {
          mode: 1, // Normal crosshair mode
        },
      });

      // Add candlestick series
      const candleSeries = chart.addSeries('Candlestick', {
        upColor: CHART_CONFIG.COLORS.UP,
        downColor: CHART_CONFIG.COLORS.DOWN,
        wickUpColor: CHART_CONFIG.COLORS.UP,
        wickDownColor: CHART_CONFIG.COLORS.DOWN,
        borderVisible: false,
      });

      // Convert data to the format expected by lightweight-charts
      const formattedData: CandlestickData[] = chartData.map(item => ({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      candleSeries.setData(formattedData);
      chart.timeScale().fitContent();

      // Store references
      chartRef.current = chart;
      seriesRef.current = candleSeries;

      // Handle resize
      const handleResize = () => {
        if (chartContainer.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainer.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);
      setIsLoading(false);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating chart:', error);
      setIsLoading(false);
    }
  }, [chartData, height]);

  // Update chart data when props change
  useEffect(() => {
    if (seriesRef.current && data) {
      const formattedData: CandlestickData[] = data.map(item => ({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
      seriesRef.current.setData(formattedData);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div
        className={`w-full flex items-center justify-center bg-gray-900 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-white">Loading chart...</div>
      </div>
    );
  }

  return (
    <div
      ref={chartContainer}
      className={`w-full rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    />
  );
};

export default Chart;
