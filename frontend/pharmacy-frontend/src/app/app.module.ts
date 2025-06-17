import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './components-user/user-list/user-list.component';
import { UserProfileComponent } from './components-user/user-profile/user-profile.component';
import { UserUpdateComponent } from './components-user/user-update/user-update.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { PromotionEditComponent } from './components/promotion-edit/promotion-edit.component';
import { ManufacturerListComponent } from './components/manufacturer-list/manufacturer-list.component';
import { ManufacturerEditComponent } from './components/manufacturer-edit/manufacturer-edit.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { ManufacturerAddComponent } from './components/manufacturer-add/manufacturer-add.component';
import { PromotionAddComponent } from './components/promotion-add/promotion-add.component';
import { ListproComponent } from './layout/listpro/listpro.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryForecastComponent } from './components/inventory-forecast/inventory-forecast.component';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { ProductDetailComponent } from './layout/product-detail/product-detail.component';
import { ListcateComponent } from './layout/listcate/listcate.component';
import { ListpromoComponent } from './layout/listpromo/listpromo.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { ListorderComponent } from './layout/listorder/listorder.component';
import { PaymenresulsComponent } from './layout/paymenresuls/paymenresuls.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UpdateProfileComponent } from './layout/update-profile/update-profile.component';
import { OrderReportComponent } from './components/order-report/order-report.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAddComponent,
    HomeComponent,
    ProductEditComponent,
    ProductViewComponent,
    CategoryListComponent,
    PromotionListComponent,
    CategoryEditComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserProfileComponent,
    UserUpdateComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    PromotionEditComponent,
    ManufacturerListComponent,
    ManufacturerEditComponent,
    CategoryAddComponent,
    ManufacturerAddComponent,
    PromotionAddComponent,
    ListproComponent,
    InventoryListComponent,
    InventoryForecastComponent,
    InventoryManagementComponent,
    ProductDetailComponent,
    ListcateComponent,
    ListpromoComponent,
    OrderComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ListorderComponent,
    PaymenresulsComponent,
    PaymentSuccessComponent,
    OrderListComponent,
    UpdateProfileComponent,
    OrderReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
