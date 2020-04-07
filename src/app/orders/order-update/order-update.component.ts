import {
  Component,
  OnInit
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import {
  ActivatedRoute,
  ParamMap
} from "@angular/router";

import {
  Order
} from "../order.model";
import {
  OrdersService
} from "../orders.service";
import {
  AuthService
} from "../../auth/auth.service";
import {
  Subscription
} from 'rxjs';


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
  private authStatusSub: Subscription;
  private ordersSub: Subscription;
  userIsAuthenticated = false;

  constructor(
    public ordersService: OrdersService, private authService: AuthService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      shipping_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      status: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if (paramMap.has("order_id")) {
        this.mode = "edit";
        this.orderId = paramMap.get("order_id");
        console.log(this.orderId)

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
          console.log(this.order)

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
    console.log(this.orderId)
    console.log(this.form.value.orderProductId)

    this.isLoading = true;
    this.ordersService.updateOrder(
      this.orderId,
      this.form.value.shipping_id,
      this.form.value.status,
      this.order.customer_id,
      this.order.subtotal,
      this.order.tax,
      this.order.total,
      this.order.date,
      this.order.orderProductId,
      this.order.orderProductName,
      this.order.orderProductIsDonation,
      this.order.orderProductIsGift,
      this.order.orderProductComment,
      this.order.orderProductQuantity,
      this.order.orderProductPrice
    );
    this.form.reset();
  }


}
