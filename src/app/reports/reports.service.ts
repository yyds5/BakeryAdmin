import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Order } from "../orders/order.model";
import { orderProducts } from "../orders/order.model";
import { jsonpCallbackContext } from "@angular/common/http/src/module";

@Injectable({ providedIn: "root" })
export class ReportsService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  private donationOrders: Order[] = [];
  private donationOrdersUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrders() {
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
      });
  }
// //get one base on the id
// router.get("/:id", (req, res, next) => {
//   Order.findOne({order_id:req.params.id}).then(order => {
//     if (order) {
//       res.status(200).json(order);
//     } else {
//       res.status(404).json({ message: "order not found!" });
//     }
//   });
// });
  getDonationOrderUpdateListener() {
    return this.donationOrdersUpdated.asObservable();
  }
  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }



  getOrder(id: string) {
    return this.http.get<{
      _id: string,
      status:string,
      shippingDetail:string,
      subtotal:number,
      tax:number,
      total:number,
      date:Date,
      orderProducts : Array<orderProducts>,
      paymentMethod:string,
      customerFullName:string,
      phone:string,
      email:string,
      shippingAddress:string,
      deliveryNote:string,
      city:string,
      province:string,
      postalCode:string
      }>(
      "http://localhost:3000/api/orders/" + id
    );
  }

  updateOrder(
    id: string,
    status:string,
    shippingDetail:string,
      subtotal:number,
      tax:number,
      total:number,
      date:Date,
      orderProducts,
      paymentMethod:string,
      customerFullName:string,
      phone:string,
      email:string,
      shippingAddress:string,
      deliveryNote:string,
      city:string,
      province:string,
      postalCode:string
       ) {
    let orderData: Order | FormData;
    orderData = new FormData();
      orderData = {
        id: id,
        status:status,
        shippingDetail:shippingDetail,
        subtotal:subtotal,
        tax:tax,
        total:total,
        date:date,
        orderProducts : orderProducts,
        paymentMethod:paymentMethod,
        customerFullName:customerFullName,
        phone:phone,
        email:email,
        shippingAddress:shippingAddress,
        deliveryNote:deliveryNote,
        city:city,
        province:province,
        postalCode:postalCode

      };


    this.http
      .put("http://localhost:3000/api/orders/" + id, orderData)
      .subscribe(response => {

        const updatedOrders = [...this.orders];
        const oldOrderIndex = updatedOrders.findIndex(p => p.id === id);
        const order: Order = {
          id: id,
          status:status,
          shippingDetail:shippingDetail,
          subtotal:subtotal,
          tax:tax,
          total:total,
          date:date,
          orderProducts : orderProducts,
          paymentMethod:paymentMethod,
          customerFullName:customerFullName,
          phone:phone,
          email:email,
          shippingAddress:shippingAddress,
          deliveryNote:deliveryNote,
          city:city,
          province:province,
          postalCode:postalCode
        };
        console.log(order);
        updatedOrders[oldOrderIndex] = order;

        this.orders = updatedOrders;
        this.ordersUpdated.next([...this.orders]);
        this.router.navigate(["/"]);
      });
  }

}
