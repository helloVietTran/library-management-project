import React from 'react';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { FaBan } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { Avatar, Dropdown, MenuProps, Rate } from 'antd';
import { GoStarFill } from 'react-icons/go';

import MaskDescription from '@/components/MaskDescription';
import { useLikeComment } from '../hooks/useLikeComment';
import { useDeleteComment } from '../hooks/useDeleteComment';

interface ReviewCardProps {
  reviewId: string;
  avatar: string;
  name: string;
  role: string;
  likeCount: number;
  createdAt: string;
  content: string;
  rating: number;
  userId: string;
  isLast?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  name,
  likeCount,
  createdAt,
  content,
  role,
  rating,
  userId,
  reviewId,
  isLast = false, 
}) => {
  const likeMutation = useLikeComment(reviewId);
  const deleteCommentMutation = useDeleteComment(reviewId);

  const handleLike = () => {
    likeMutation.mutate();
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: `like-${reviewId}`,
      label: (
        <div className="flex items-center cursor-pointer px-[10px] py-[4px] hover:text-blue-600">
          <AiOutlineLike className="mr-2" size={18} />
          Thích bình luận
        </div>
      ),
      onClick: handleLike, 
    },
    {
      key: `delete-${reviewId}`,
      label: (
        <div className="flex items-center cursor-pointer px-[10px] py-[4px] hover:text-red-600">
          <FaBan className="mr-2" />
          Xóa bình luận
        </div>
      ),
      onClick: handleDeleteComment, 
    },
  ];

  return (
    <div className={`review-card flex gap-4 p-4 px-6 ${!isLast ? 'border-b border-gray-400' : ''}`}>
      <div className="flex-shrink-0">
        <Link href={`/users/${userId}`}>
          <Avatar src={avatar} alt={userId} size={50} />
        </Link>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">
              <Link href={`/users/${userId}`}>{name}</Link>
            </h3>
            <p className="text-sm text-gray-500">
              {role}
              <span className="px-2">•</span>
              <span>{likeCount} lượt thích</span>
            </p>
          </div>
        </div>

        {/* Post */}
        <div className="mt-2 mb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Rate
                disabled
                defaultValue={rating}
                allowHalf
                character={<GoStarFill size={16} />}
                className="star-icon"
              />
              <span className="text-sm font-medium">{rating} / 5</span>
            </div>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </div>
        </div>

        <MaskDescription className="text-sm" content={content} />

        <div className="mt-2 flex justify-end">
          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <IoIosMore className="cursor-pointer" size={20} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
