import React from 'react';

interface RatingBreakdownProps {
  ratingsBreakdown: Record<number, number>;
  totalComments: number;
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  ratingsBreakdown,
  totalComments,
}) => {
  return (
    <div className="space-y-2 w-full sm:w-[75%] text-sm">
      {Object.entries(ratingsBreakdown)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([stars, value]) => {
          const percentage = totalComments > 0 ? (value / totalComments) * 100 : 0;

          return (
            <div key={stars} className="flex items-center pb-4">
              <div className="w-16 font-medium text-gray-700">{stars} sao</div>
              <div className="flex-1 h-3 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-24 text-sm text-gray-500 ml-2">
                {percentage.toFixed(0)}%
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RatingBreakdown;
