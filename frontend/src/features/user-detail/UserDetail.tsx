import React from 'react';
import UserHeader from './components/UserHeader';
import ReviewCard from '../book-detail/components/ReviewCard';
import PageTitle from '@/components/PageTitle';
import { Divider } from 'antd';
import { notFound, useParams } from 'next/navigation';

import useFetchUserDetail from './hooks/useFetchUserDetail';
import Loader from '@/components/Loader';
import useComments from './hooks/useFetchCommentsByUserId';
import { Comment } from '@/interfaces/commom';

const UserDetail = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: userData, isLoading, isError } = useFetchUserDetail(id);
  const { data: commentData } = useComments(id);

  const user = userData?.data;
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !user) {
    notFound();
  }

  return (
    <div>
      <PageTitle
        title="Thông tin chi tiết"
        breadcrumbs={[
          { label: 'DS người dùng', href: '/users' },
          { label: user.fullName, href: `/users/${user._id}`, isActive: true },
        ]}
      />
      <Divider />
      <UserHeader data={user} />

      <div className="flex flex-col gap-4">
        {!Array.isArray(commentData?.data) || commentData.data.length === 0 ? (
          <span className="text-sm text-gray-600">Người dùng chưa bình luận!</span>
        ) : (
          commentData.data.map((comment: Comment) => (
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserDetail;
