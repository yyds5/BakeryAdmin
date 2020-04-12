import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductCreateComponent } from "./products/product-create/product-create.component";
import { OrderListComponent } from "./orders/order-list/order-list.component";
import { OrderUpdateComponent } from "./orders/order-update/order-update.component";
import { LoginComponent } from "./auth/login/login.component";
import { ReportsComponent } from "./reports/reports.component";

import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";



const routes: Routes = [
  // { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent,canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent,canActivate: [AuthGuard] },
  { path: 'createproduct', component: ProductCreateComponent,canActivate: [AuthGuard] },
  { path: 'editproduct/:productId', component: ProductCreateComponent,canActivate: [AuthGuard] },
  { path: 'productlist', component: ProductListComponent },
  { path: '', component: OrderListComponent },
  { path: 'updateorder/:order_id', component: OrderUpdateComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: "signup", component: SignupComponent },
  { path: "reports", component: ReportsComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule {}
