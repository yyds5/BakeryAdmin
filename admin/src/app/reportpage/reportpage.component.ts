import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportpage',
  templateUrl: './reportpage.component.html',
  styleUrls: ['./reportpage.component.css']
})
export class ReportpageComponent implements OnInit {
  donationOrders=[
    {
      orderNumber:"101",
      name: "Person A",
      amount: "15.6",
      comment:"good good"
    },
    {
      orderNumber:"255",
      name: "Person B",
      amount: "125.6",
      comment:" good"
    },
    {
      orderNumber:"873",
      name: "Person C",
      amount: "5.6",
      comment:""
    }]

  constructor() { }

  ngOnInit() {
  }

}
