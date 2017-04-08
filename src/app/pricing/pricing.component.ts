import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  iosLink: string;
  androidLink: string;
  constructor() {
    this.iosLink = '';
    this.androidLink = '';
  }

  ngOnInit() {
  }

}
