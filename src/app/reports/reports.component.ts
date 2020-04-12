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
  orders: Order[] = [];
  isLoading = false;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  private ordersDonationSub: Subscription;
  ordersWithDonation: Order[] = [];

  constructor(public ordersService: OrdersService, public reportsService:ReportsService,
    private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.ordersService.getOrders();
    this.ordersSub = this.ordersService.getOrderUpdateListener()
      .subscribe((orders: Order[]) => {
        this.isLoading = false;
        this.orders = orders;
      console.log(this.orders);
      });

      //donation orders
      this.reportsService.getOrders();
      this.ordersDonationSub = this.reportsService.getOrderUpdateListener()
        .subscribe((ordersWithDonation: Order[]) => {
          this.isLoading = false;
          this.ordersWithDonation = ordersWithDonation;
      console.log(this.ordersWithDonation);
        });




      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
