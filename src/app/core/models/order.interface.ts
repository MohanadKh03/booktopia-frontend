export interface Order {
  id: string;
  userid: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
}

export interface OrderItem {
  bookid: string;
  quantity: number;
  price: number;
}
