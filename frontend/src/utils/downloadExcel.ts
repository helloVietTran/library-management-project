import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface Header {
  id: string;
  header: string;
}

export const getNestedValue = (obj: any, path: string): any => {
  const value = path.split('.').reduce((acc, key) => acc?.[key], obj);
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'object' ? v.name : v)).join(', ');
  }
  return value ?? 'N/A';
};
const dowloadExcel = (data: any[], headers: Header[], fileName: string) => {
  const formattedData = data.map((item) =>
    headers.reduce(
      (acc, header) => {
        acc[header.header] = getNestedValue(item, header.id);
        return acc;
      },
      {} as { [key: string]: string | number }
    )
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);
};

export default dowloadExcel;
