import { useState } from 'react';
import { App, Rate } from 'antd';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';

import { useCreateComment } from '../hooks/useCreateComment';
import { useParams } from 'next/navigation';

const ReviewActions = () => {
  const { message } = App.useApp();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const params = useParams();
  const id = params.id as string;
  const createCommentMutation = useCreateComment();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (!comment.trim()) {
      message.warning('Vui lòng nhập bình luận!');
      return;
    }

    if (rating === 0) {
      message.warning('Vui lòng chọn số sao!');
      return;
    }

    createCommentMutation.mutate({
      bookId: id,
      content: comment,
      rating
    })

    setComment('');
    setRating(0);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);

    const sortBy = isAscending ? -1 : 1;
    const currentUrl = window.location.href;
    const newUrl = new URL(currentUrl);
    newUrl.searchParams.set('sortBy', sortBy.toString());
    window.history.pushState({ path: newUrl.href }, '', newUrl.href);
  };

  return (
    <div className="review-actions mt-6">
      <div className="flex flex-col gap-3">
        {/* Star Rating */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-sm font-medium">Đánh giá:</span>
          <Rate value={rating} onChange={setRating} />
        </div>

        <div className="flex items-center gap-4">
          <div className="comment-input-wrapper flex items-center bg-gray-100 px-3 py-2 w-[500px]">
            <input
              type="text"
              placeholder="Nhập bình luận..."
              value={comment}
              onChange={handleCommentChange}
              className="ml-2 bg-transparent focus:outline-none flex-1"
            />
            <IoMdSend
              className="cursor-pointer size-5 text-gray-500 hover:text-gray-700"
              onClick={handlePostComment}
            />
          </div>

          <button className="sort-btn cursor-pointer" onClick={toggleSortOrder}>
            {isAscending ? (
              <GoSortAsc className="text-gray-600 size-6" />
            ) : (
              <GoSortDesc className="text-gray-600 size-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewActions;
