import React from 'react';
import { useParams } from 'next/navigation';
import ReviewCard from './ReviewCard';
import useFetchComments from '../hooks/useFetchComments';
import Loader from '@/components/Loader';
import { Comment } from '@/interfaces/commom';

const ReviewList = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: commentData, isLoading, isError } = useFetchComments(id);

  if (isLoading) return <Loader />;

  const comments = commentData?.data;
  if (isError || !comments)
    return (
      <p className="text-gray-500 text-sm mt-4">Chưa có bình luận nào!</p>
    );

  return (
    <div className="mt-4">
      {comments.map((comment: Comment, index: number) => (
        <ReviewCard
          key={comment._id}
          avatar={comment.user.avatar || '/img/default/default-avatar.png'}
          name={comment.user.fullName}
          role={comment.user.role.name}
          createdAt={new Date(comment.createdAt).toLocaleDateString()}
          content={comment.content}
          rating={comment.rating}
          likeCount={comment.likes?.length || 0}
          userId={comment.user._id}
          reviewId={comment._id}
          isLast={index === comments.length - 1} // Thêm tham số kiểm tra phần tử cuối cùng
        />
      ))}
    </div>
  );
};

export default ReviewList;
