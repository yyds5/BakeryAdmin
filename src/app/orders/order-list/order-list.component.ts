import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Order } from "../order.model";
import { OrdersService } from "../orders.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"]
})
export class OrderListComponent implements OnInit,OnDestroy {
  orders: Order[] = [];
  isLoading = false;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public ordersService: OrdersService,
    private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.ordersService.getOrders();
    this.ordersSub = this.ordersService.getOrderUpdateListener()
      .subscribe((orders: Order[]) => {
        this.isLoading = false;
        this.orders = orders;
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
