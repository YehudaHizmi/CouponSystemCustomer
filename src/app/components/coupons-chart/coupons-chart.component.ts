import { MessageService } from 'primeng/api';
import { WebApiCustomerService } from 'src/app/services/web-api-customer.service';
import { Coupon } from './../common/Coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons-chart',
  templateUrl: './coupons-chart.component.html',
  styleUrls: ['./coupons-chart.component.css']
})
export class CouponsChartComponent implements OnInit {

  coupons: Coupon[];
  types: any[];
  data: any;
  numOfCoupon: number[];
  hasCoupons = true;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private customerService: WebApiCustomerService, private messageService: MessageService) {

    // This method calculate number of coupons of each type
    this.calcNumOfCouponsByType();

    // Prepare the data for the chart
    this.data = {
      labels: ['Resturant', 'Electricity', 'Food', 'Health', 'Sports', 'Camping', 'Travelling'],
      datasets: [
          {
              data: this.numOfCoupon,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#48C9B0', '#273746', '#FFFFFF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#48C9B0', '#273746', '#FFFFFF']
          }]
    };
  }

  // initialze the types of the coupons from the service
  ngOnInit() {
    this.types = this.customerService.couponTypes;

  }

  // This method is activated from the constructor and it calculates the number of coupons of each type
  private calcNumOfCouponsByType() {
    this.customerService.getPurchasedCouponsService().subscribe(
      (resp) => {
        this.coupons = resp.json();
        this.numOfCoupon = [0, 0, 0, 0, 0, 0, 0];
        for (const coupon of this.coupons) {
          switch (coupon.type) {
            case 'RESTURANT': this.numOfCoupon[0]++;  break;
            case 'ELECTRICITY': this.numOfCoupon[1]++; break;
            case 'FOOD': this.numOfCoupon[2]++; break;
            case 'HEALTH': this.numOfCoupon[3]++; break;
            case 'SPORTS': this.numOfCoupon[4]++; break;
            case 'CAMPING': this.numOfCoupon[5]++; break;
            case 'TRAVELLING': this.numOfCoupon[6]++; break;
          }
        }
        // console.log(this.numOfCoupon);

        // this.types = [
        //   {label: 'Resturant' , value: 'RESTURANT'},
        //   {label: 'Electricity', value: 'ELECTRICITY'},
        //   {label: 'Food', value: 'FOOD'},
        //   {label: 'Health', value: 'HEALTH'},
        //   {label: 'Sports', value: 'SPORTS'},
        //   {label: 'Camping', value: 'CAMPING'},
        //   {label: 'Travelling', value: 'TRAVELLING'},
        // ];

        this.data = {
          labels: ['Resturant', 'Electricity', 'Food', 'Health', 'Sports', 'Camping', 'Travelling'],
          datasets: [
              {
                  data: this.numOfCoupon, // [1, 1, 1, 9, 4, 6, 6],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#48C9B0', '#273746', '#FFFFFF'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#48C9B0', '#273746', '#FFFFFF']
              }]
        };
     },
     (error) => {
       this.hasCoupons = false;
      //  console.log(this.hasCoupons);
     }

     );
  }
}
