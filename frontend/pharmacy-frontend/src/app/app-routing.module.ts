import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
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
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryForecastComponent } from './components/inventory-forecast/inventory-forecast.component';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { ProductDetailComponent } from './layout/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { ListorderComponent } from './layout/listorder/listorder.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UpdateProfileComponent } from './layout/update-profile/update-profile.component';
import { OrderReportComponent } from './components/order-report/order-report.component';

const routes: Routes = [

   { path: 'home', component: UserLayoutComponent },

 
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {path: 'edit/:id', component: ProductEditComponent},
  {path: 'products/:id', component: ProductViewComponent},

  
  
  
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},


   {path: 'admin', component: AdminLayoutComponent,
    children: [ 
      { path: 'products', component: ProductListComponent },
 {path: 'edit/:id', component: ProductEditComponent},
  {path: 'products/:id', component: ProductViewComponent},

    {path: 'userlist', component: UserListComponent},
   {path: 'profile', component: UserProfileComponent},
   {path: 'update/:id', component: UserUpdateComponent},

{ path: 'category', component: CategoryListComponent },
   {path: 'editcate/:id', component: CategoryEditComponent},
   { path: 'addcate', component: CategoryAddComponent },

  { path: 'promotions', component: PromotionListComponent },
  { path: 'editpromo/:id', component: PromotionEditComponent },
  { path: 'addpro', component: PromotionAddComponent },

  { path: 'manufacturer', component: ManufacturerListComponent },
  { path: 'editmanu/:id', component: ManufacturerEditComponent },
   { path: 'addmanu', component: ManufacturerAddComponent },

   { path: 'inventory', component: InventoryListComponent },
  { path: 'forecast', component: InventoryForecastComponent },

  { path: 'inventories', component: InventoryManagementComponent },

  {path: 'orderlist', component: OrderListComponent},
  {path: 'orderReport', component: OrderReportComponent}

   ]},
   {path: 'user/home', component: UserLayoutComponent, 
   children:[
   ]},
   {path: 'product/:id', component: ProductDetailComponent},
    { path: 'cart', component: CartComponent },
    {path: 'profile/user', component: ProfileComponent},
    { path: 'order', component: ListorderComponent },
    {path: 'payment-success', component: PaymentSuccessComponent},
    {path: 'update/profile/:id', component: UpdateProfileComponent}

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
