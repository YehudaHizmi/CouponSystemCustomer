import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuModule } from 'primeng/menu';
import { CustomerMainAreaComponent } from './components/customer-main-area/customer-main-area.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from 'primeng/dragdrop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { WebApiCustomerService } from './services/web-api-customer.service';
import { HttpModule } from '@angular/http';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PurchaseCouponComponent } from './components/purchase-coupon/purchase-coupon.component';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PurchasedCouponsComponent } from './components/purchased-coupons/purchased-coupons.component';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { CouponsChartComponent } from './components/coupons-chart/coupons-chart.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerMainAreaComponent,
    PurchaseCouponComponent,
    PurchasedCouponsComponent,
    CouponsChartComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    BrowserAnimationsModule,
    DragDropModule,
    ToastModule,
    HttpModule,
    PanelModule,
    TableModule,
    DataViewModule,
    ScrollPanelModule,
    FieldsetModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    SliderModule,
    ChartModule,
    ProgressSpinnerModule,
    RouterModule.forRoot(
      [
        {
          path: 'couponChart',
          component: CouponsChartComponent
        },
        {
          path: 'purchaseCoupon',
          component: PurchaseCouponComponent
        },
        {
          path: 'purchasedCoupons',
          component: PurchasedCouponsComponent
        },
        { path: '',
          redirectTo: '/couponChart',
          pathMatch: 'full'
         },
      ]
    )
  ],
  providers: [WebApiCustomerService, MessageService, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
