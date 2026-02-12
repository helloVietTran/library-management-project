import React, { useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Select } from 'antd';

import BoxContent from '@/components/BoxContent';
import useBooksCount from '../hooks/useBooksCount';
import useBorrowedCount from '../hooks/useBorrowedCount';
import useBorrowedCountStats from '../hooks/useBorrowedCountStats';

ChartJS.register(ArcElement, Tooltip, Legend);

const { Option } = Select;

interface BookOverviewProps {
  openOverview: boolean;
}

const BookOverview: React.FC<BookOverviewProps> = ({ openOverview }) => {
  const [filter, setFilter] = useState<string>("borrowedTurn");

  const { data: booksCountData } = useBooksCount();
  const { data: borrowedCountData } = useBorrowedCount();
  const { data: borrowedCountStatsData } = useBorrowedCountStats();

  const chartData = useMemo(() => {
    const stats = Array.isArray(borrowedCountStatsData) ? borrowedCountStatsData : [];
    return {
      labels: stats.map((item) => `${item.label} lượt`),
      datasets: [
        {
          data: stats.map((item) => item.count),
          backgroundColor: ['#60A5FA', '#FBBF24', '#F472B6'],
          hoverBackgroundColor: ['#3B82F6', '#F59E0B', '#EC4899'],
        },
      ]
    };
  }, [borrowedCountStatsData]);


  const options = {
    cutout: '65%',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`grid grid-cols-12 gap-4 mb-4 transition-all duration-500 
          ${openOverview
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none h-[0px] overflow-hidden'
        }`}
    >
      <BoxContent className="col-span-12 md:col-span-6 lg:col-span-7">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-600 font-medium">Phân loại theo:</div>
          <Select
            defaultValue={filter}
            onChange={(value) => setFilter(value)}
            size="middle"
          >
            <Option value="borrowedTurn">Lượt mượn</Option>
          </Select>
        </div>
        <div className="flex items-center gap-4 lg:gap-12">
          <div style={{ width: '150px', height: '150px' }}>
            <Doughnut data={chartData} options={options} />
          </div>
          <div>
            <ul>
              {chartData.labels.map((label: string, index: number) => (
                <li key={index} className="flex items-center mb-2">
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
                      marginRight: '6px',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BoxContent>

      <div className="flex gap-4 col-span-12 md:col-span-6 lg:col-span-5">
        <BoxContent
          className="relative basis-[50%] p-3 text-gray-600 min-h-[120px]
                  bg-[url('/img/bg/overview-bg-7.jpg')] bg-cover bg-center"
        >
          <div className="text-gray-600 font-medium">Tổng số sách</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            {booksCountData?.data.quantity || 0}
          </div>
        </BoxContent>
        <BoxContent
          className="relative basis-[50%] p-3 text-gray-600 min-h-[120px]
                  bg-[url('/img/bg/overview-bg-6.jpg')] bg-cover bg-center"
        >
          <div className="text-gray-600 font-medium">Số lượt mượn</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            {borrowedCountData?.data.quantity}
          </div>
        </BoxContent>
      </div>
    </div>
  );
};

export default BookOverview;
