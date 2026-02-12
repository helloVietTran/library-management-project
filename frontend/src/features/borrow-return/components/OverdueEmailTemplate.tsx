import React from 'react';
import dayjs from 'dayjs';

interface OverdueEmailTemplateProps {
  name?: string;
  bookTitle?: string;
  dueDate?: Date | string;
  borrowDate?: Date | string;
  returnDate?: Date | string;
}

const OverdueEmailTemplate: React.FC<OverdueEmailTemplateProps> = ({
  name = 'Nguyễn Văn A',
  bookTitle = 'Sách X',
  dueDate,
  borrowDate,
}) => {
  const overdueDays = dayjs().diff(dayjs(dueDate), 'day');

  borrowDate = dayjs(borrowDate).format('DD/MM/YYYY');
  dueDate = dayjs(dueDate).format('DD/MM/YYYY');
  return (
    <div className="text-gray-800 font-sans flex justify-center items-center min-h-screen p-2">
      <div className="max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-red-600 text-white text-center py-5">
          <h1 className="text-xl font-bold uppercase">
            Thông báo quá hạn trả sách
          </h1>
        </div>
        <div className="p-6">
          <p className="mb-4 text-lg">
            Chào <span className="font-semibold">{name}</span>,
          </p>
          <p className="mb-4">
            Hệ thống thư viện Vbrary xin thông báo rằng bạn đã{' '}
            <span className="text-red-600 font-semibold">quá hạn trả sách</span>
            .
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-2">Thông tin sách:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Tên sách:</strong> {bookTitle}
              </li>

              <li>
                <strong>Ngày mượn:</strong> {borrowDate}
              </li>

              <li>
                <strong>Hạn trả:</strong> {dueDate}
              </li>
              <li>
                <strong>Số ngày trễ:</strong> {overdueDays} ngày
              </li>
            </ul>
          </div>
          <p className="mt-4">
            Vui lòng trả sách sớm nhất có thể để tránh các khoản phạt phát sinh.
            Nếu bạn đã trả sách hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi.
          </p>
          <p className="mt-4 text-gray-600 text-sm">
            Cảm ơn bạn đã sử dụng dịch vụ của thư viện Vbrary!
          </p>
        </div>
        <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
          © 2025 Thư viện Vbrary. Mọi quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default OverdueEmailTemplate;
