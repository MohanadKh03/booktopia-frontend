export interface Review {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}