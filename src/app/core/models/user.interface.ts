export interface User {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin';
  address?: string;
  phone?: string;
  token?: string;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  reviewsGiven: number;
}
