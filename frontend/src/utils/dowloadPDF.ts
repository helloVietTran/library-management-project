import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '@/config/font/TimesNewRoman';
import { getNestedValue, Header } from './downloadExcel';

const downloadPDF = (data: any[], headers: Header[], fileName: string) => {
  const doc = new jsPDF();
  doc.setFont('Times New Roman', 'normal');

  doc.setFontSize(18);
  const title = 'Danh sách mượn trả sách';
  const pageWidth = doc.internal.pageSize.width;
  const titleWidth =
    (doc.getStringUnitWidth(title) * 18) / doc.internal.scaleFactor;
  doc.text(title, (pageWidth - titleWidth) / 2, 20);

  const tableColumn = headers.map((header) => header.header);
  const tableRows = data.map((item) =>
    headers.map((header) => getNestedValue(item, header.id))
  );

  if (tableRows.length === 0) {
    tableRows.push(Array(tableColumn.length).fill('Không có dữ liệu'));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { font: 'Times New Roman', fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
    columnStyles: { 0: { cellWidth: 'auto' } },
  });

  doc.save(`${fileName}.pdf`);
};

export default downloadPDF;
