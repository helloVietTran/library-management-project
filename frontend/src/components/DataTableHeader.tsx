import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface DataTableHeaderProps {
  onPageSizeChange: (value: number) => void;
  onSearch: (value: string) => void;
  searchValue: string;
  searchPlaceholder?: string;
  pageSize?: number;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  onPageSizeChange,
  onSearch,
  searchValue,
  searchPlaceholder = 'Search...',
  pageSize = 10,
}) => {
  return (
    <div>
      <div className="py-[12px] flex justify-between flex-col sm:flex-row gap-2">
        <div className="relative">
          <input
            placeholder={searchPlaceholder}
            className="data-table-input text-sm sm:text-base rounded bg-white pl-12 w-[240px] sm:w-[300px]
             placeholder:truncate placeholder:text-ellipsis placeholder:whitespace-nowrap"
            onChange={(e) => onSearch(e.target.value)}
            value={searchValue}
          />
          <CiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            color="#555252"
            size={20}
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="entry-per-page rounded p-2 text-sm sm:text-base"
            defaultValue={pageSize}
            onChange={(e) => onPageSizeChange(+e.target.value)}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <span className="text-gray-700 text-xs sm:text-sm">tài liệu / trang</span>
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;
