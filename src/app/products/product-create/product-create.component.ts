import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ProductsService } from "../products.service";
import { Product } from "../product.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"]
})

export class ProductCreateComponent implements OnInit {
  enteredName = "";
  enteredDetail = "";
  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private productId: string;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      price: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      quantity: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      detail: new FormControl(null, { validators: [Validators.required] }),
      isDonation: new FormControl(null, { validators: [Validators.required] }),
      isAlcohol: new FormControl(null, { validators: [Validators.required] }),
      isGift: new FormControl(null, { validators: [Validators.required] }),
      itemComment: new FormControl(null, { validators: [Validators.required] }),
      itemTotal: new FormControl(null, { validators: [Validators.required] }),
      sugarLevel: new FormControl(null, { validators: [Validators.required] }),
      calorieLevel: new FormControl(null, { validators: [Validators.required] }),
      fatLevel: new FormControl(null, { validators: [Validators.required] }),
      allergyContent: new FormControl(null, { validators: [Validators.required] }),
      visibility: new FormControl(null, { validators: [Validators.required] }),


    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.mode = "edit";
        this.productId = paramMap.get("productId");
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            imagePath: productData.imagePath,
            name: productData.name,
            price: productData.price,
            detail: productData.detail,
            isDonation: productData.isDonation,
            isAlcohol: productData.isAlcohol,
            quantity: productData.quantity,
            category: productData.category,
            isGift: productData.isGift,
            itemComment: productData.itemComment,
            itemTotal:productData.itemTotal,
            sugarLevel:productData.sugarLevel,
            calorieLevel: productData.calorieLevel,
            fatLevel:productData.fatLevel,
            allergyContent: productData.allergyContent,
            visibility: productData.visibility
          };
          this.form.setValue({
            image: this.product.imagePath,
            name: this.product.name,
            price: this.product.price,
            detail: this.product.detail,
            isDonation: this.product.isDonation,
            isAlcohol: this.product.isAlcohol,
            quantity: this.product.quantity,
            category: this.product.category,
            isGift: this.product.isGift,
            itemComment: this.product.itemComment,
            itemTotal:this.product.itemTotal,
            sugarLevel:this.product.sugarLevel,
            calorieLevel: this.product.calorieLevel,
            fatLevel:this.product.fatLevel,
            allergyContent: this.product.allergyContent,
            visibility:this.product.visibility
          });
        });
      } else {
        this.mode = "create";
        this.productId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.productsService.addProduct(
      this.form.value.name,
      this.form.value.image,
      this.form.value.price,
      this.form.value.detail,
      this.form.value.isDonation,
      this.form.value.isAlcohol,
      this.form.value.quantity,
      this.form.value.category,
      this.form.value.isGift,
      this.form.value.itemComment,
      this.form.value.itemTotal,
      this.form.value.sugarLevel,
      this.form.value.calorieLevel,
      this.form.value.fatLevel,
      this.form.value.allergyContent,
      this.form.value.visibility

      );
    } else {
      this.productsService.updateProduct(
        this.productId,
        this.form.value.image,
        this.form.value.name,
        this.form.value.price,
        this.form.value.detail,
        this.form.value.isDonation,
        this.form.value.isAlcohol,
        this.form.value.quantity,
        this.form.value.category,
        this.form.value.isGift,
        this.form.value.itemComment,
        this.form.value.itemTotal,
        this.form.value.sugarLevel,
        this.form.value.calorieLevel,
        this.form.value.fatLevel,
        this.form.value.allergyContent,
        this.form.value.visibility
      );
    }
    this.form.reset();
  }
}
