export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
}

export interface OrderItem {
  bookId: number;
  quantity: number;
  price: number;
}