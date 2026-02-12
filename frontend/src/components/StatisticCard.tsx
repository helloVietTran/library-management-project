import { FC } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

interface StatisticCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  borderRightColor?: 'green' | 'orange' | 'blue';
}

const StatisticCard: FC<StatisticCardProps> = ({
  title,
  currentValue,
  previousValue,
  borderRightColor = 'green',
}) => {
  const difference = currentValue - previousValue;
  return (
    <div
      className={`w-full border-${borderRightColor} text-primary`}
    >
      <div className="flex justify-between items-center gap">
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <div className="flex items-center mt-2">
        <span className="total text-3xl font-bold mr-4">{currentValue}</span>

        <div>
          <div
            className={`flex items-center text-sm mt-2 ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {difference >= 0 ? (
              <FaArrowTrendUp size={20} className="mr-2" />
            ) : (
              <FaArrowTrendUp size={20} className="mr-2 rotate-180" />
            )}

            <span>{difference >= 0 ? '+' + difference : '-' + difference}</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Tháng trước: {previousValue}
      </div>
    </div>
  );
};

export default StatisticCard;
