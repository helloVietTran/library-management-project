import Link from 'next/link';
import { Avatar } from 'antd';

import MaskDescription from '@/components/MaskDescription';
import { Author } from '@/interfaces/commom';

interface AboutAuthorProps {
  data: Author;
}

const AboutAuthor: React.FC<AboutAuthorProps> = ({ data }) => {
  return (
    <div key={data._id}>
      <div className="flex items-center mt-4">
        <div className="w-16 h-16 relative">
          <Link href={`/authors/${data._id}`}>
            <Avatar
              src={data.imgSrc || undefined}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                fontSize: '24px',
                color: '#555',
              }}
              shape="circle"
            >
              {data.imgSrc ? null : data.name.charAt(0)}
            </Avatar>
          </Link>
        </div>

        <div className="ml-4">
          <h2 className="text-sm font-semibold mb-2 text-primary">
            {data.name}
          </h2>
          <p className="text-sm text-gray-600">quốc tịch: {data.nationality}</p>
        </div>
      </div>

      <MaskDescription
        className="mt-4 text-sm"
        content={data.biography || 'Không có mô tả'}
      />
    </div>
  );
};

export default AboutAuthor;
