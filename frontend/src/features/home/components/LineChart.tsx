import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import BoxContent from '@/components/BoxContent';
import useBorrowReturnStats from '../hooks/useBorrowReturnStats';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface LineChartProps {
  chartTitle: string;
}

const LineChart: React.FC<LineChartProps> = ({ chartTitle }) => {
  const { data: statsData, isLoading, isError, error } = useBorrowReturnStats();

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
        <p>
          Lỗi khi tải dữ liệu thống kê: {error?.message || 'Không có dữ liệu'}
        </p>
      </BoxContent>
    );
  }

  // Prepare chart data
  const labels = Object.keys(statsData);
  const borrowedData = labels.map(
    (month) => statsData[month]?.borrowedBooksCount || 0
  );
  const returnedData = labels.map(
    (month) => statsData[month]?.returnedBooksCount || 0
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Số sách mượn',
        data: borrowedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.2,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBorderWidth: 1,
        pointRadius: 3,
        borderWidth: 2,
      },
      {
        label: 'Số sách trả',
        data: returnedData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.2,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBorderWidth: 1,
        pointRadius: 3,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
       
      },
      y: {
        title: {
          display: false,
        },
        ticks: {
          stepSize:
            Math.max(...[...borrowedData, ...returnedData]) > 10 ? 20 : 2,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <BoxContent className="relative bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-primary text-sm font-bold mb-2">{chartTitle}</h2>
      <div className="w-full">
        <Line data={chartData} options={options} />
      </div>
    </BoxContent>
  );
};

export default LineChart;
