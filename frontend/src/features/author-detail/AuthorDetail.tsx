import React from 'react';
import { Divider } from 'antd';
import { notFound, useParams } from 'next/navigation';

import PageTitle from '@/components/PageTitle';
import BoxContent from '@/components/BoxContent';
import MaskDescription from '@/components/MaskDescription';
import RelatedAuthorBookCard from './components/RelatedAuthorBookCard';
import AuthorInfo from './components/AuthorInfo';
import useFetchAuthorDetail from './hooks/useFetchAuthorDetail';
import Loader from '@/components/Loader';
import useFetchBooksByAuthor from './hooks/useFetchBooksByAuthor';
import Footer from '@/components/Footer';
import { Author, Book } from '@/interfaces/commom';

const AuthorDetail = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: authorResponse, isLoading, isError } = useFetchAuthorDetail(id);
  const author = authorResponse?.data;

  const { data: allBooksByAuthor } = useFetchBooksByAuthor(author?._id ?? '');

  const titles = [
    { label: 'Tên tác giả', key: 'name' },
    { label: 'Năm sinh', key: 'dob' },
    { label: 'Quốc tịch', key: 'nationality' },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !author) {
    notFound();
  }

  return (
    <div className="author-detail">
      <PageTitle
        title="Thông tin chi tiết"
        breadcrumbs={[
          { label: 'Tất cả tác giả', href: '/authors' },
          {
            label: author.name,
            href: `/authors/${author._id}`,
            isActive: true,
          },
        ]}
      />
      <BoxContent>
        <div className="flex flex-col md:flex-row py-8">
          <div className="flex-shrink-0 md:w-1/4">
            <div className="w-[80%] mx-auto">
              <img
                src={author.imgSrc || '/img/default/default-avatar.png'}
                alt={author.name}
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
          </div>

          <div className="flex-1 md:ml-6 mt-6 md:mt-0">
            <h2 className="text-lg text-primary font-semibold">{author.name}</h2>

            <Divider className="custom-divider" />

            <AuthorInfo
              titles={titles}
              content={author}
              awards={author.awards}
            />

            <Divider className="custom-divider" />

            <MaskDescription
              className="mt-4 text-sm"
              content={author.biography || ''}
            />

            <Divider className="custom-divider" />

            {allBooksByAuthor?.data.length > 0 ?
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-600">Cùng tác giả</p>
              </div>
              : <></>
            }
            {allBooksByAuthor?.data?.map((book: Book) => (
              <RelatedAuthorBookCard
                key={book._id}
                title={book.title}
                authors={book.authors.map((author: Author) => author.name)}
                rating={book.rating || 4}
                ratingsCount={book.ratingsCount || 0}
                publishedYear={new Date(book.publishedDate).getFullYear()}
                bookImage={book.coverImage || '/img/default/default-book.png'}
                bookId={book._id}
              />
            ))}
          </div>
        </div>
      </BoxContent>
      <Footer />
    </div>
  );
};

export default AuthorDetail;
