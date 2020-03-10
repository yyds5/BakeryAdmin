import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductcreateComponent } from './productcreate/productcreate.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { ReportpageComponent } from './reportpage/reportpage.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { SlideshowComponent } from './slideshow/slideshow.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'productlist', component:ProductlistComponent},
  {path:'productcreate', component:ProductcreateComponent},
  {path:'productedit', component:ProducteditComponent},
  {path:'orderdetail', component:OrderdetailComponent},
  {path:'reportpage', component:ReportpageComponent},
  {path:'orderlist', component:OrderlistComponent},
  {path:'slideshow', component:SlideshowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SlideshowComponent,OrderlistComponent,LoginComponent,ReportpageComponent, ProductlistComponent,ProductcreateComponent,ProducteditComponent,OrderdetailComponent]
