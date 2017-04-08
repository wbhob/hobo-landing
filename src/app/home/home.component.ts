import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  iosLink: string;
  androidLink: string;

  constructor() {
    this.iosLink = '#';
    this.androidLink = '#';
  }

  ngOnInit() {
  }

}
