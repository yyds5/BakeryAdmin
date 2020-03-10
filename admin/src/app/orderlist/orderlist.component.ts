import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  Orderlist = [{
    total:"88.95",
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
  {itemNumber:"5312321",
  itemName:"egg tart",
  itemQuantity:"22",
  itemPrice:"2.99",
  itemComment:"no Comment"
}]},
{
  total:"811.95",
  orderNumber : 56354559,
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
{itemNumber:"5312321",
itemName:"egg tart",
itemQuantity:"22",
itemPrice:"2.99",
itemComment:"no Comment"
}]}
]

  constructor() { }

  ngOnInit() {
  }

}
