import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Order } from "../orders/order.model";
import { orderProducts } from "../orders/order.model";

@Injectable({ providedIn: "root" })
export class ReportsService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  private donationOrders: Order[] = [];
  private donationOrdersUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDonationOrders() {
    this.http
      .get<{ message: string; orders: any }>("http://localhost:3000/api/orders/donations")
      .pipe(
        map(orderData => {
          return orderData.orders.map(order => {
            return {
              id: order._id,
              status:order.status,
              shippingDetail:order.shippingDetail,
              subtotal:order.subtotal,
              tax:order.tax,
              total:order.total,
              date:order.date,
              orderProducts : order.orderProducts,
              paymentMethod:order.paymentMethod,
              customerFullName:order.customerFullName,
              phone:order.phone,
              email:order.email,
              shippingAddress:order.shippingAddress,
              deliveryNote:order.deliveryNote,
              city:order.city,
              province:order.province,
              postalCode:order.postalCode
            };
          });
        })
      )
      .subscribe(transformedOrders => {
        this.orders = transformedOrders;
        this.ordersUpdated.next([...this.orders]);
        console.log(this.orders)
      });
  }

  getDonationOrderUpdateListener() {
    return this.donationOrdersUpdated.asObservable();
  }
  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }



}
