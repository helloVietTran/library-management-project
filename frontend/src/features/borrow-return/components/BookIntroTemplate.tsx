interface BookIntroTemplateProps {
  name?: string;
  bookTitle?: string;
  author?: string;
  description?: string;
}

const BookIntroTemplate: React.FC<BookIntroTemplateProps> = ({
  name,
  bookTitle,
  author,
  description,
}) => {
  return (
    <div className="text-gray-800 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-xl font-bold">Giới thiệu sách mới</h1>
        </div>
        <div className="p-6">
          <p className="mb-4 text-lg">
            Chào <span className="font-semibold">{name}</span>,
          </p>
          <p className="mb-4">
            Thư viện Vbrary xin giới thiệu đến bạn một tựa sách hấp dẫn mà bạn
            không nên bỏ lỡ:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Thông tin sách:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Tên sách:</strong> {bookTitle}
              </li>
              <li>
                <strong>Tác giả:</strong> {author}
              </li>
            </ul>
          </div>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Mô tả:</p>
            <p>{description}</p>
          </div>
          <p className="mt-4">
            Hãy ghé thăm thư viện Vbrary để mượn sách và khám phá thêm nhiều tựa
            sách thú vị khác.
          </p>
          <p className="mt-4 text-gray-600">
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
          </p>
        </div>
        <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
          © 2025 Thư viện Vbrary. Mọi quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default BookIntroTemplate;
