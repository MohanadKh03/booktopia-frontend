export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  categoryName?: string;
  stock?: number;
}
