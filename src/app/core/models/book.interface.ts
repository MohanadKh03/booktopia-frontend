export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category?: string;
  description?: string;
  stock?: number;
}