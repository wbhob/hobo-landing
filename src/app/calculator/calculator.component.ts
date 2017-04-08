import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  today: string;
  res = {
    distance: '0',
    price: 0
  };
  trip = {
    to: '',
    from: '',
    date: new Date() || ''
  };
  _loaded = true;
  error = '';
  constructor(
    public cdr: ChangeDetectorRef
  ) {
    this.today = moment().format('MMMM D, YYYY');
  }

  onSelect(val) {
    this.trip.date = val.select;
  }

  calculateDistance() {
    this.loaded = false;
    this.error = '';
    let date: string;
    if (this.trip.date && this.trip.date !== 'Invalid date') {
      date = moment(this.trip.date).hours(11).format();
    } else {
      date = moment().hours(11).format();
    }
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.trip.from],
      destinations: [this.trip.to],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, (res, status) => {
      const dist = parseInt(res.rows[0].elements[0].distance.text.replace(',', '').replace(' mi', ''), 10);
      this.res.distance = res.rows[0].elements[0].distance.text.replace(' mi', '');
      if (dist < 560 && dist > 100) {
        const diff = moment().diff(date, 'hours');
        console.log(diff);
        if (diff > -24) {
          this.res.price = dist * 0.65;
        } else if (diff < -120) {
          this.res.price = dist * 0.35;
        } else {
          this.res.price = dist * 0.45;
        }
      } else {
        this.error = `The trip is outside our threshold for trips; trips must
        be longer than 100 miles and shorter than 560 miles. The trip you entered was ` + this.res.distance + ' miles.';
      }
      this.loaded = true;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
  }

  get loaded(): boolean {
    return this._loaded;
  }
  set loaded(val: boolean) {
    this._loaded = val;
  }

}
