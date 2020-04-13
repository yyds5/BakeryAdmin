import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Order } from "../orders/order.model";
import { OrdersService } from "../orders/orders.service";
import { AuthService } from "../auth/auth.service";
import {ReportsService} from "./reports.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})

export class ReportsComponent implements OnInit,OnDestroy {
  isLoading = false;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  orders: Order[] = [];
  private ordersSub: Subscription;

  ordersWithDonation: Order[] = [];
  private ordersDonationSub: Subscription;

  constructor(public ordersService: OrdersService, public reportsService:ReportsService,
    private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.ordersService.getOrders();
    //donation orders
    this.reportsService.getDonationOrders();
    this.ordersDonationSub = this.reportsService.getOrderUpdateListener()
      .subscribe((ordersWithDonation: Order[]) => {
        this.isLoading = false;
        this.ordersWithDonation = ordersWithDonation;
    console.log(this.ordersWithDonation);
      });

    this.ordersSub = this.ordersService.getOrderUpdateListener()
      .subscribe((orders: Order[]) => {
        this.isLoading = false;
        this.orders = orders;
      console.log(this.orders);
      });

      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ConvertToJSON(product: any) {
    return JSON.parse(product);
}

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
