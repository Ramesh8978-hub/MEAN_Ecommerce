import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountryService } from './shared/country.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductItemComponent } from './components/products-list/product-item/product-item.component';
import { ProductsDataComponent } from './components/products-list/products-data/products-data.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressComponent } from './components/address-list/address/address.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MaterialModule } from './material-module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './components/admin/admin.component';
import { AdminService } from './shared/admin.service';
import { AdminAuthGuard } from './adminAuth/admin-auth.guard';
import { AdminAuthInterceptor } from './adminAuth/adminAuth.interceptor';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { ProductsEditComponent } from './components/products-list/products-edit/products-edit.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AddPaymentComponent } from './components/payments/add-payment/add-payment.component';
import { OrderStatusComponent } from './components/orders/order-status/order-status.component';
import { OrdersDataComponent } from './components/orders/orders-data/orders-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductsDataComponent,
    CartListComponent,
    OrdersComponent,
    OrdersListComponent,
    AddressComponent,
    AddressListComponent,
    PlaceOrderComponent,
    AdminComponent,
    AdminHeaderComponent,
    ProductsEditComponent,
    PaymentsComponent,
    AddPaymentComponent,
    OrderStatusComponent,
    OrdersDataComponent,
  ],
  entryComponents:[
    ProductsEditComponent,
    AddressComponent,
    PaymentsComponent,
    OrderStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    MaterialModule,
    Ng2OrderModule,
    NgxPaginationModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminAuthInterceptor,
    multi: true
  }, UserService,AdminService, AuthGuard,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
