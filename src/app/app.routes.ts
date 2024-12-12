import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BookDetailsComponent } from './pages/books/book-details/book-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderHistoryComponent } from './pages/orders/order-history/order-history.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminBooksComponent } from './pages/admin/admin-books/admin-books.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderHistoryComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/books', component: AdminBooksComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];
