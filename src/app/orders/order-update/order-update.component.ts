import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Order } from "../order.model";
import { OrdersService } from "../orders.service";

@Component({
  selector: "app-order-update",
  templateUrl: "./order-update.component.html",
  styleUrls: ["./order-update.component.css"]
})

export class OrderUpdateComponent implements OnInit {
  order: Order;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private orderId: string;


  constructor(
    public ordersService: OrdersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      shipping_id: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if (paramMap.has("order_id")) {
        this.mode = "edit";
        this.orderId = paramMap.get("order_id");
        console.log(this.orderId)
        console.log(this.order)

        this.isLoading = true;
        this.ordersService.getOrder(this.orderId).subscribe(orderData => {
          this.isLoading = false;
          this.order = {
          id: orderData._id,
        shipping_id: orderData.shipping_id,
        status: orderData.status,
        customer_id: orderData.customer_id,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        total: orderData.total,
        date: orderData.date,
        orderProductId: orderData.orderProductId,
        orderProductName: orderData.orderProductName,
        orderProductIsDonation: orderData.orderProductIsDonation,
        orderProductIsGift: orderData.orderProductIsGift,
        orderProductComment: orderData.orderProductComment,
        orderProductQuantity: orderData.orderProductQuantity,
        orderProductPrice: orderData.orderProductPrice
          };
          this.form.setValue({
          shipping_id: this.order.shipping_id,
          status: this.order.status,
        customer_id: this.order.customer_id,
        subtotal: this.order.subtotal,
        tax: this.order.tax,
        total: this.order.total,
        date: this.order.date,
        orderProductId: this.order.orderProductId,
        orderProductName: this.order.orderProductName,
        orderProductIsDonation: this.order.orderProductIsDonation,
        orderProductIsGift: this.order.orderProductIsGift,
        orderProductComment: this.order.orderProductComment,
        orderProductQuantity: this.order.orderProductQuantity,
        orderProductPrice: this.order.orderProductPrice
          });
        });
      } else {
        this.mode = "create";

        this.orderId = null;

      }
    });
  }



  onSaveOrder() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
      this.ordersService.updateOrder(
        this.orderId,
        this.form.value.shipping_id,
        this.form.value.status,
        this.form.value.customer_id,
        this.form.value.subtotal,
        this.form.value.tax,
        this.form.value.total,
        this.form.value.date,
        this.form.value.orderProductId,
        this.form.value.orderProductName,
        this.form.value.orderProductIsDonation,
        this.form.value.orderProductIsGift,
        this.form.value.orderProductComment,
        this.form.value.orderProductQuantity,
        this.form.value.orderProductPrice
      );
    this.form.reset();
  }
}
