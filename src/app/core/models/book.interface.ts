export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  category: {
    _id: string;
    name: string;
  };
  stock: number;
}
