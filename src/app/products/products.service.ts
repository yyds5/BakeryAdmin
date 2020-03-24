import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getProducts() {
    this.http
      .get<{ message: string; products: any }>("http://localhost:3000/api/products")
      .pipe(
        map(productData => {
          return productData.products.map(product => {
            return {
              name: product.name,
              id: product._id,
              imagePath: product.imagePath,
              price: product.price,
              detail: product.detail,
              isDonation: product.isDonation,
              isAlcohol: product.isAlcohol,
              quantity: product.quantity,
              category: product.category,
              isGift: product.isGift,
              itemComment: product.itemComment,
              itemTotal: product.itemTotal,
              sugarLevel: product.sugarLevel,
              calorieLevel: product.calorieLevel,
              fatLevel: product.fatLevel,
              allergyContent: product.allergyContent,
              visibility: product.visibility

            };
          });
        })
      )
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      imagePath: string,
      price: number,
      detail: string,
      isDonation: string,
      isAlcohol: string,
      quantity: number,
      category: string,
      isGift: string,
      itemComment: string,
      itemTotal:number,
      sugarLevel:number,
      calorieLevel: number,
      fatLevel:number,
      allergyContent: string,
      visibility:string }>(
      "http://localhost:3000/api/products/" + id
    );
  }

  addProduct(
    name: string,
    image: File,
    price: number,
    detail: string,
    isDonation: string,
    isAlcohol: string,
    quantity: number,
    category: string,
    isGift: string,
    itemComment: string,
    itemTotal:number,
    sugarLevel:number,
    calorieLevel: number,
    fatLevel:number,
    allergyContent: string,
    visibility: string) {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price.toString());
    productData.append("detail", detail);
    productData.append("isDonation", isDonation);
    productData.append("isAlcohol", isAlcohol);
    productData.append("quantity", quantity.toString());
    productData.append("category", category);
    productData.append("isGift", isGift);
    productData.append("itemComment", itemComment);
    productData.append("itemTotal", itemTotal.toString());
    productData.append("sugarLevel", sugarLevel.toString());
    productData.append("calorieLevel", calorieLevel.toString());
    productData.append("fatLevel", fatLevel.toString());
    productData.append("allergyContent", allergyContent);
    productData.append("image", image,name);
    productData.append("visibility", visibility);
    this.http
      .post<{ message: string; product: Product }>(
        "http://localhost:3000/api/products",
        productData
      )
      .subscribe(responseData => {
        const product: Product = {
          id: responseData.product.id,
          imagePath: responseData.product.imagePath,
          name: name,
          price: price,
          detail: detail,
          isDonation: isDonation,
          isAlcohol: isAlcohol,
          quantity: quantity,
          category: category,
          isGift: isGift,
          itemComment: itemComment,
          itemTotal:itemTotal,
          sugarLevel:sugarLevel,
          calorieLevel: calorieLevel,
          fatLevel:fatLevel,
          allergyContent: allergyContent,
          visibility: visibility
        };
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
        this.router.navigate(["/productlist"]);
      });
  }

  updateProduct(
      id: string,
      image: File | string,
      name: string,
      price: number,
      detail: string,
      isDonation: string,
      isAlcohol: string,
      quantity: number,
      category: string,
      isGift: string,
      itemComment: string,
      itemTotal:number,
      sugarLevel:number,
      calorieLevel: number,
      fatLevel:number,
      allergyContent: string,
      visibility:string ) {
    let productData: Product | FormData;
    if (typeof image === "object") {
      productData = new FormData();
      productData.append("id", id);
      productData.append("name", name);
      productData.append("image", image, name);
      productData.append("price", price.toString());
      productData.append("detail", detail);
      productData.append("isDonation", isDonation);
      productData.append("isAlcohol", isAlcohol);
      productData.append("quantity", quantity.toString());
      productData.append("category", category);
      productData.append("isGift", isGift);
      productData.append("itemComment", itemComment);
      productData.append("itemTotal", itemTotal.toString());
      productData.append("sugarLevel", sugarLevel.toString());
      productData.append("calorieLevel", calorieLevel.toString());
      productData.append("fatLevel", fatLevel.toString());
      productData.append("allergyContent", allergyContent);
      productData.append("visibility", visibility);
    } else {
      productData = {
        id: id,
        imagePath: image,
        name: name,
        price: price,
        detail: detail,
        isDonation: isDonation,
        isAlcohol: isAlcohol,
        quantity: quantity,
        category: category,
        isGift: isGift,
        itemComment: itemComment,
        itemTotal:itemTotal,
        sugarLevel:sugarLevel,
        calorieLevel: calorieLevel,
        fatLevel:fatLevel,
        allergyContent: allergyContent,
        visibility: visibility,
      };
    }
    this.http
      .put("http://localhost:3000/api/products/" + id, productData)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(p => p.id === id);
        const product: Product = {
          id: id,
          imagePath: "",
          name: name,
          price: price,
          detail: detail,
          isDonation: isDonation,
          isAlcohol: isAlcohol,
          quantity: quantity,
          category: category,
          isGift: isGift,
          itemComment: itemComment,
          itemTotal:itemTotal,
          sugarLevel:sugarLevel,
          calorieLevel: calorieLevel,
          fatLevel:fatLevel,
          allergyContent: allergyContent,
          visibility: visibility
        };
        updatedProducts[oldProductIndex] = product;
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
        this.router.navigate(["/productlist"]);
      });
  }

  deleteProduct(productId: string) {
    this.http
      .delete("http://localhost:3000/api/products/" + productId)
      .subscribe(() => {
        const updatedProducts = this.products.filter(product => product.id !== productId);
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

}
