export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  address?: string;
  phone?: string;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  reviewsGiven: number;
}