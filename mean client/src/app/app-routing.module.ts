import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './adminAuth/admin-auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressComponent } from './components/address-list/address/address.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddPaymentComponent } from './components/payments/add-payment/add-payment.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductItemComponent } from './components/products-list/product-item/product-item.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { 
    path: 'userProfile', component: UserProfileComponent ,canActivate:[AuthGuard]
  },
  { 
    path: 'adminProfile', component: AdminHeaderComponent,canActivate: [AdminAuthGuard]
  },
  { path: 'addProduct', component: ProductItemComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'address-list', component: AddressListComponent },
  // { path: 'address', component: AddressComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'your-orders', component: OrdersListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'payment', component: PaymentsComponent },
  // { path: 'add-card', component: AddPaymentComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
