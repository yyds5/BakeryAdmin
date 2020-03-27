export interface Order {
  id: string;
  shipping_id: string;
  status: string;
  customer_id: string;
  subtotal: number;
  tax: number;
  total: number;
  date: string;
  orderProductId: Array<string>[];
  orderProductName: Array<string>[];
  orderProductIsDonation: Array<string>[];
  orderProductIsGift: Array<string>[];
  orderProductComment: Array<string>[];
  orderProductQuantity: Array<number>[];
  orderProductPrice: Array<number>[];
}
