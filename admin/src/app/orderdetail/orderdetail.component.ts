import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  Order = {
    orderNumber : 5635469,
    orderDate : new Date(),
    orderItems:[
      {itemNumber:"65651",
      itemName:"banana tart",
      itemQuantity:"1",
      itemPrice:"3.99",
      itemComment:"I'm always relieved when someone is delivering a eulogy and I realise I'm listening to it."
    },
    {itemNumber:"646542",
    itemName:"apple cake",
    itemQuantity:"3",
    itemPrice:"5.99",
    itemComment:"I'm always relieved"
  },
  {itemNumber:"646542",
  itemName:"apple cake",
  itemQuantity:"3",
  itemPrice:"5.99",
  itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
{itemNumber:"646542",
itemName:"apple cake",
itemQuantity:"3",
itemPrice:"5.99",
itemComment:"I'm always relieved"
},
  {itemNumber:"5312321",
  itemName:"egg tart",
  itemQuantity:"22",
  itemPrice:"2.99",
  itemComment:"no Comment"
}
  ],
   shippingDetail:{
      orderNumber : 5635469,
      fullName:"India J. Montemayor",
      address:"1041 Willow Greene Drive Montgomery, AL 36104",
      addressAdditional:"Apt 20 Unit",
      city:"Waterloo",
      province:"ON",
      postalCode:"O1X2O3",
      phone:"334-327-6954",
      deliveryMode:"Delivery to Specfic Location",
      deliveryNote:"Code: 2002"
    }



  }
  constructor() { }

  ngOnInit() {
  }

}
