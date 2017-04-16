import { AfterViewChecked } from '@angular/core/core';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements AfterViewChecked {
  res = {
    distance: '0',
    price: 0
  };
  trip = {
    to: '',
    from: '',
    date: ''
  };
  _loaded = true;
  error = '';

  formErrors = {
    'name': '',
    'power': ''
  };

  @ViewChild('dateinput') dateinput: ElementRef;

  calcForm: NgForm;
  @ViewChild('calcForm') currentForm: NgForm;


  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'power': {
      'required': 'Power is required.'
    }
  };

  constructor(
    public cdr: ChangeDetectorRef
  ) {
    this.trip.date = moment().format('MMMM D, YYYY');
    setInterval(() => {
      this.log();
    }, 5000);
  }



  log() {
    console.log(this.dateinput.nativeElement.value);
  }

  calculateDistance() {
    this.loaded = false;
    this.error = '';
    const dateInput = this.dateinput.nativeElement.value;
    let date: string;
    if (dateInput && dateInput !== 'Invalid date') {
      date = moment(dateInput).hours(11).format();
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

  ngAfterViewChecked() {
    if (this.currentForm === this.calcForm) { return; }
    this.calcForm = this.currentForm;
    if (this.calcForm) {
      this.calcForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.calcForm) { return; }
    const form = this.calcForm.form;

    for (const field in this.formErrors) {
      if (this.formErrors[field]) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors[key]) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  get loaded(): boolean {
    return this._loaded;
  }
  set loaded(val: boolean) {
    this._loaded = val;
  }

}
