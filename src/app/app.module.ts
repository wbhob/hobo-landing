import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PickadateComponent } from './pickadate/ng-pickadate.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TosComponent } from './tos/tos.component';
import { ProductComponent } from './product/product.component';
import { LegalComponent } from './legal/legal.component';
import { PricingComponent } from './pricing/pricing.component';
import { CalculatorComponent } from './calculator/calculator.component';

window['$'] = require('jquery/dist/jquery');

const APP_ROUTES = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'legal/rider',
    component: TosComponent
  }
]

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
    PickadateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
