export interface Order {
    id: string,
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
   postalCode:string,
}

export class orderProducts{
    constructor( Id:String,
                 productName:String,
                 isDonation:Boolean,
                 isGift:Boolean,
                 comment:String,
                 price:Number,
                 quantity:Number

    ){}
}
