import {
  Component,
  OnInit,
  OnDestroy
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
import { orderProducts } from "../order.model";

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
      shippingDetail: new FormControl(null, {
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

        this.isLoading = true;
        this.ordersService.getOrder(this.orderId).subscribe(orderData => {
          this.isLoading = false;
          this.order = {
            id: orderData._id,
            status: orderData.status,
            shippingDetail: orderData.shippingDetail,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            total: orderData.total,
            date: orderData.date,
            orderProducts: orderData.orderProducts,
            paymentMethod: orderData.paymentMethod,
            customerFullName: orderData.customerFullName,
            phone: orderData.phone,
            email: orderData.email,
            shippingAddress: orderData.shippingAddress,
            deliveryNote: orderData.deliveryNote,
            city: orderData.city,
            province: orderData.province,
            postalCode: orderData.postalCode,
          };

          this.form.setValue({
            status: this.order.status,
            shippingDetail: this.order.shippingDetail,
            // subtotal: this.order.subtotal,
            // tax: this.order.tax,
            // total: this.order.total,
            // date: this.order.date,
            // orderProducts: this.order.orderProducts,
            // paymentMethod: this.order.paymentMethod,
            // customerFullName: this.order.customerFullName,
            // phone: this.order.phone,
            // email: this.order.email,
            // shippingAddress: this.order.shippingAddress,
            // deliveryNote: this.order.deliveryNote,
            // city: this.order.city,
            // province: this.order.province,
            // postalCode: this.order.postalCode,
          });
          this.userIsAuthenticated = this.authService.getIsAuth();
          this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
              this.userIsAuthenticated = isAuthenticated;
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
    console.log(this.order.orderProducts)
    // console.log(this.form.value.orderProducts)


    this.isLoading = true;
    this.ordersService.updateOrder(
      this.order.id,
      this.form.value.status,
      this.form.value.shippingDetail,
      this.order.subtotal,
      this.order.tax,
      this.order.total,
      this.order.date,
      this.order.orderProducts,
      this.order.paymentMethod,
      this.order.customerFullName,
      this.order.phone,
      this.order.email,
      this.order.shippingAddress,
      this.order.deliveryNote,
      this.order.city,
      this.order.province,
      this.order.postalCode
    );

    this.form.reset();
  }


}
