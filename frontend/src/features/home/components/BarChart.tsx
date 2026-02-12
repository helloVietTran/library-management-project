import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { FaBars } from 'react-icons/fa';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BoxContent from '@/components/BoxContent';
import useMonthlyBorrowStats from '../hooks/useMonthlyBorrowStats';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarChartProps {
  barColor?: string;
  chartTitle: string;
  chartLabel: string;
}

const BarChart: React.FC<BarChartProps> = ({
  barColor = '#438afe',
  chartTitle,
  chartLabel,
}) => {
  const chartRef = useRef<any>(null);
  const [isToolbarOpen, setIsToolBarOpen] = useState(false);

  const { data: statsData, isLoading, isError } = useMonthlyBorrowStats();

  if (isLoading) {
    return (
      <BoxContent className="relative bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-primary text-sm font-bold mb-2">{chartTitle}</h2>
        <p>Đang tải dữ liệu thống kê...</p>
      </BoxContent>
    );
  }

  if (isError || !statsData) {
    return (
      <BoxContent className="relative bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-primary text-sm font-bold mb-2">{chartTitle}</h2>
        <p>Lỗi khi tải dữ liệu thống kê</p>
      </BoxContent>
    );
  }

  // prepare data
  const labels = Object.keys(statsData);
  const vals = labels.map((month) => statsData[month] || 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: chartLabel,
        data: vals,
        backgroundColor: barColor,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw} ${chartLabel}`,
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        color: '#333',
        font: {
          weight: 'bolder',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: Math.max(...vals) + 5,
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad',
    },
  };

  const downloadChart = (format: 'png' | 'jpg') => {
    const chart = chartRef.current;
    if (chart) {
      let imageURL;

      if (format === 'png') {
        imageURL = chart.toBase64Image();
      } else if (format === 'jpg') {
        const canvas = chart.canvas;
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');

        if (ctx) {
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvas, 0, 0);

          imageURL = tempCanvas.toDataURL('image/jpeg', 1.0);
        }
      }

      if (imageURL) {
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `chart.${format}`;
        link.click();
      }
    }
  };

  return (
    <BoxContent className="relative bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-primary text-sm font-bold mb-2">{chartTitle}</h2>
      <div className="absolute right-4 top-4">
        <div className="relative">
          <FaBars
            className="text-gray-500 cursor-pointer"
            size={12}
            onClick={() => setIsToolBarOpen(!isToolbarOpen)}
          />
          <div
            className={`${isToolbarOpen ? 'block' : 'hidden'} 
                        absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg`}
          >
            <button
              onClick={() => downloadChart('png')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadChart('jpg')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Download JPG
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Bar data={chartData} options={options} ref={chartRef} />
      </div>
    </BoxContent>
  );
};

export default BarChart;
