import React from 'react';
import { Divider } from 'antd';
import { useParams } from 'next/navigation';

import RatingBreakdown from './RatingBreakdown';
import ReviewActions from './ReviewActions';
import useStatsRating from '../hooks/useStatsRating';
import Loader from '@/components/Loader';

const CommunityReviews = () => {
  const params = useParams();
  const bookId = params.id as string;

  const { data, isLoading, isError } = useStatsRating(bookId);
  if (isLoading) return <Loader />;
  if (isError || !data) return <div>Chưa có đánh giá nào</div>;

  const { totalComments, ratingsBreakdown } = data;

  return (
    <div className="community-reviews">
      <Divider className="custom-divider" />
      <p className="text-xl font-semibold mb-2 text-gray-600 mb-4">
        Đánh giá từ người dùng thư viện
      </p>

      <RatingBreakdown
        ratingsBreakdown={ratingsBreakdown}
        totalComments={totalComments}
      />
      
      <ReviewActions />
    </div>
  );
};

export default CommunityReviews;
