import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Order } from "./order.model";

@Injectable({ providedIn: "root" })
export class OrdersService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getOrders() {
    this.http
      .get<{ message: string; orders: any }>("http://localhost:3000/api/orders")
      .pipe(
        map(orderData => {
          return orderData.orders.map(order => {
            return {
              id: order._id,
              shipping_id: order.shipping_id,
              status: order.status,
              customer_id: order.customer_id,
              subtotal: order.subtotal,
              tax: order.tax,
              total: order.total,
              date: order.date,
              orderProductId: order.orderProductId,
              orderProductName: order.orderProductName,
              orderProductIsDonation: order.orderProductIsDonation,
              orderProductIsGift: order.orderProductIsGift,
              orderProductComment: order.orderProductComment,
              orderProductQuantity: order.orderProductQuantity,
              orderProductPrice: order.orderProductPrice
            };
          });
        })
      )
      .subscribe(transformedOrders => {
        this.orders = transformedOrders;
        this.ordersUpdated.next([...this.orders]);
      });
  }

  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrder(id: string) {
    return this.http.get<{
      _id: string,
      shipping_id: string,
      status: string,
      customer_id: string,
      subtotal: number,
      tax: number,
      total: number,
      date: string,
      orderProductId: Array<string>[],
      orderProductName: Array<string>[],
      orderProductIsDonation: Array<string>[],
      orderProductIsGift: Array<string>[],
      orderProductComment: Array<string>[],
      orderProductQuantity: Array<number>[],
      orderProductPrice: Array<number>[]}>(
      "http://localhost:3000/api/orders/" + id
    );
  }

  updateOrder(
    id: string,
    shipping_id: string,
    status: string,
    customer_id: string,
    subtotal: number,
    tax: number,
    total: number,
    date: string,
    orderProductId: Array<string>[],
    orderProductName: Array<string>[],
    orderProductIsDonation: Array<string>[],
    orderProductIsGift: Array<string>[],
    orderProductComment: Array<string>[],
    orderProductQuantity: Array<number>[],
    orderProductPrice: Array<number>[] ) {
    let orderData: Order | FormData;
    orderData = new FormData();
    // orderData.append("id",id);
    // orderData.append("shipping_id",shipping_id);
    // orderData.append("status",status);
    // orderData.append("customer_id",customer_id);
    // orderData.append("subtotal",subtotal.toString());
    // orderData.append("tax",tax.toString());
    // orderData.append("total",total.toString());
    // orderData.append("date",date);
    // orderData.append("orderProductId",orderProductId.toString());
    // orderData.append("orderProductName",orderProductName.toString());
    // orderData.append("orderProductIsDonation",orderProductIsDonation.toString());
    // orderData.append("orderProductIsGift",orderProductIsGift.toString());
    // orderData.append("orderProductComment",orderProductComment.toString());
    // orderData.append("orderProductIsDonation",orderProductIsDonation.toString());
    // orderData.append("orderProductQuantity",orderProductQuantity.toString());
    // orderData.append("orderProductPrice",orderProductPrice.toString());
    console.log(orderProductName);

      orderData = {
        id: id,
        shipping_id: shipping_id,
        status: status,
        customer_id: customer_id,
        subtotal: subtotal,
        tax: tax,
        total: total,
        date: date,
        orderProductId: orderProductId,
        orderProductName: orderProductName,
        orderProductIsDonation: orderProductIsDonation,
        orderProductIsGift: orderProductIsGift,
        orderProductComment: orderProductComment,
        orderProductQuantity: orderProductQuantity,
        orderProductPrice: orderProductPrice
      };
      console.log(orderData);
    this.http
      .put("http://localhost:3000/api/orders/" + id, orderData)
      .subscribe(response => {
        const updatedOrders = [...this.orders];
        const oldOrderIndex = updatedOrders.findIndex(p => p.id === id);
        const order: Order = {
          id: id,
          shipping_id: shipping_id,
          status: status,
          customer_id: customer_id,
          subtotal: subtotal,
          tax: tax,
          total: total,
          date: date,
          orderProductId: orderProductId,
          orderProductName: orderProductName,
          orderProductIsDonation: orderProductIsDonation,
          orderProductIsGift: orderProductIsGift,
          orderProductComment: orderProductComment,
          orderProductQuantity: orderProductQuantity,
          orderProductPrice: orderProductPrice
        };
        updatedOrders[oldOrderIndex] = order;
        this.orders = updatedOrders;
        this.ordersUpdated.next([...this.orders]);
        this.router.navigate(["/"]);
      });
  }

}
