import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TosComponent } from './tos/tos.component';
import { ProductComponent } from './product/product.component';
import { LegalComponent } from './legal/legal.component';
import { PricingComponent } from './pricing/pricing.component';
import { CalculatorComponent } from './calculator/calculator.component';

import * as $ from 'jquery/dist/jquery';
import { SupportComponent } from './support/support.component';

const APP_ROUTES = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'pricing',
    component: PricingComponent
  }, {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'legal/rider',
    component: TosComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TosComponent,
    ProductComponent,
    LegalComponent,
    PricingComponent,
    CalculatorComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
