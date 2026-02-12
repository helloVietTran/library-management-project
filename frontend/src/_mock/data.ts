type BookPreview = {
  id: string;
  title: string;
  imgSrc: string;
  authorNames: string[];
  reviewCount: number;
  ratingPoint: number;
};

export const mockBooks: BookPreview[] = [
  {
    id: '681b612bc9bb0234c78ee31e',
    title: 'Sống mòn',
    imgSrc:
      'https://res.cloudinary.com/ds0zvwotk/image/upload/v1746624812/library-resources/owxoeaeefl0ltx8jutmj.jpg',
    authorNames: ['Nam Cao'],
    reviewCount: 312,
    ratingPoint: 4.7,
  },
  {
    id: '6827522e152e9fb4c4a7939e',
    title: 'Harry Potter',
    imgSrc:
      'https://res.cloudinary.com/ds0zvwotk/image/upload/v1747407407/library-resources/gdehwquyagjf9bwirqzd.jpg',
     authorNames: ['J. K. Rowling'],
    reviewCount: 890,
    ratingPoint: 4.8,
  },
  {
    id: '68274d86152e9fb4c4a7928d',
    title: 'Dế mèn phiêu lưu ký',
    authorNames: ['Tô Hoài'],
    imgSrc:
      'https://res.cloudinary.com/ds0zvwotk/image/upload/v1747406215/library-resources/brnf3vnliw67f6kgoddc.jpg',
    reviewCount: 580,
    ratingPoint: 4.9,
  },
  {
    id: '68275186152e9fb4c4a79375',
    title: 'Nhà giả kim',
    imgSrc:
      'https://res.cloudinary.com/ds0zvwotk/image/upload/v1747407239/library-resources/qlavh3vjxydhxjwktivf.jpg',
    authorNames: ['Paulo Coelho'],
    reviewCount: 215,
    ratingPoint: 4.5,
  },
   {
    id: '68275436152e9fb4c4a793f4',
    title: 'Rừng Na Uy',
    imgSrc:
      'https://res.cloudinary.com/ds0zvwotk/image/upload/v1747407927/library-resources/cm8xkpazmgh4xgsij4b7.jpg',
    authorNames: ['Murakami Haruki'],
    reviewCount: 215,
    ratingPoint: 4.5,
  },
];
