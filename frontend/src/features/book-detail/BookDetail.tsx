import React from 'react';
import { Divider, Rate } from 'antd';
import { notFound, useParams } from 'next/navigation';
import { GoStarFill } from 'react-icons/go';

import Loader from '@/components/Loader';
import BoxContent from '@/components/BoxContent';
import PageTitle from '@/components/PageTitle';
import AboutAuthor from './components/AboutAuthor';
import MaskDescription from '@/components/MaskDescription';
import Slider from '@/components/Slider';
import BookInfo from './components/BookInfo';
import BookCard from './components/BookCard';
import CommunityReviews from './components/CommunityReviews';
import useFetchBookById from './hooks/useFetchBookById';
import ReviewList from './components/ReviewList';
import SplashScreen from '@/components/SplashScreen';
import { mockBooks } from '@/_mock/data';
import { Author } from '@/interfaces/commom';
import Footer from '@/components/Footer';

const BookDetail: React.FC = () => {
  const titles = [
    { label: 'Số trang', key: 'pageCount' },
    { label: 'Nhà xuất bản', key: 'publisher' },
    { label: 'Ngôn ngữ', key: 'language' },
  ];

  const params = useParams();
  const id = params.id as string;

  const { data: bookData, isLoading, isError } = useFetchBookById(id);
  if (isLoading) {
    return <Loader />;
  }

  if (isError || !bookData?.data) {
    notFound();
  }

  const book = bookData?.data;

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-detail">
      {isLoading ? <SplashScreen /> : <></>}
      <PageTitle
        title="Thông tin chi tiết"
        breadcrumbs={[
          { label: 'DS đầu sách', href: '/books' },
          { label: bookData?.data.title, href: `/books/${book._id}`, isActive: true },
        ]}
      />
      <BoxContent className="mt-4 px-6">
        <div className="flex flex-col md:flex-row py-8">
          <div className="flex-shrink-0 md:w-1/4">
            <div className="w-[80%] mx-auto">
              <img
                src={book.coverImage || '/img/default/default-book.png'}
                alt="Book Cover"
                className="w-full h-auto rounded-lg shadow"
              />
              <p className="text-center text-green-700 font-semibold mt-4">
                {book.price + ' VND'}
              </p>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="flex-1 md:ml-6 mt-6 md:mt-0">
            <h2 className="text-xl font-semibold mb-2 text-primary">
              {book.title}
            </h2>

            <p className="text-gray-700 mb-2 text-sm">
              by {book.authors.map((author: Author) => author.name).join(', ')}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <Rate
                disabled
                defaultValue={book.rating || 3.5}
                allowHalf
                character={<GoStarFill />}
                className="star-icon"
              />
              <div>
                <span className="text-lg font-semibold">
                  {book.rating || 3.5}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  được đánh giá từ cộng đồng
                </span>
              </div>
            </div>

            <Divider className="custom-divider" />
            <span className="font-semibold mb-2 text-base text-gray-600">
              Mô tả
            </span>
            <MaskDescription
              className="mb-6 text-sm"
              content={book.description || 'Không có mô tả'}
            />
            <Divider className="custom-divider" />

            <BookInfo titles={titles} content={book} genres={book.genres} />
            <Divider className="custom-divider" />

            <div className="about-author">
              <span className="font-semibold mb-2 text-gray-600">
                Về tác giả
              </span>

              {book.authors.map((author) => (
                <AboutAuthor data={author} key={author._id} />
              ))}
            </div>

            <Divider className="custom-divider" />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-600 mb-4">
            Đề xuất cho độc giả
          </p>
          <Slider data={mockBooks} SliderCard={BookCard} />
        </div>

        <div className="mb-4">
          <CommunityReviews />
          <ReviewList />
        </div>

      </BoxContent>
      <Footer />
    </div>
  );
};

export default BookDetail;
