import { SelectItem, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
import { WebApiCustomerService } from 'src/app/services/web-api-customer.service';
import { ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { toASCII } from 'punycode';

@Component({
  selector: 'app-purchased-coupons',
  templateUrl: './purchased-coupons.component.html',
  styleUrls: ['./purchased-coupons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PurchasedCouponsComponent implements OnInit {

  coupons: Coupon[];
  selectedCoupon: Coupon;
  headr = 'Purchased Coupons';
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  selectKey: string;
  sortField: string;
  sortOrder: number;
  value: string;
  types: any[];
  price: number;
  maxPrice: number;
  minPrice: number;
  steps = 0.01;
  legend = 'Filters';
  hasData = false;
  // searchInput: string;


  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private customerService: WebApiCustomerService, private messageService: MessageService) {
    this.types = customerService.couponTypes;
    // this.types = [
    //   {label: 'Resturant' , value: 'RESTURANT'},
    //   {label: 'Electricity', value: 'ELECTRICITY'},
    //   {label: 'Food', value: 'FOOD'},
    //   {label: 'Health', value: 'HEALTH'},
    //   {label: 'Sports', value: 'SPORTS'},
    //   {label: 'Camping', value: 'CAMPING'},
    //   {label: 'Travelling', value: 'TRAVELLING'},
    // ];
  }


  ngOnInit() {
    // this method populate the alreadyPurchasedCoupons array with all the purchased coupons
    this.getPurchasedCoupons();
    this.sortOptions = this.customerService.sortOptions;


    // this.sortOptions = [
    //   {label: 'Type', value: 'type'},
    //   {label: 'Price L2H', value: 'price'},
    //   {label: 'Price H2L', value: '!price'},
    //   {label: 'Start Date', value: 'startDate'},
    //   {label: 'End Date', value: 'endDate'},
    // ];
  }

  // updatePrice() {
  //   let newPoint, newPlace, offset, width;
  //   const elemant = $('p-slider');
  //   console.log(elemant);
  //   width = elemant.width ();
  //   console.log(width);
  //   newPoint = (this.price - this.minPrice) / (this.maxPrice - this.minPrice);
  //   offset = -1.3;
  //   if (newPoint < 0 ) {
  //     newPlace = 0;
  //   } else if (newPoint > 1) {
  //     newPlace = width;
  //   } else {
  //     newPlace = width * newPoint + offset;
  //     offset -= newPoint;
  //   }
  //   elemant.next('output').css({
  //     left: newPlace,
  //     marginLeft: offset + '%'
  //   }).text(this.price);
  // }

  // This mwthod is activated (by event) and sort the view according to the selection of the user
  onSortChange(event) {
    this.value = event.value;
    if (this.value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = this.value.substring(1, this.value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = this.value;
    }
}

  // this method is activated once the user press the detailes button and it present the infromation of the coupon and the option to
  // view its information
selectCoupon(event: Event, coupon: Coupon) {
  this.selectedCoupon = coupon;
  this.displayDialog = true;
   event.preventDefault();
}

onDialogHide() {
  this.selectedCoupon = null;
}

// This method is activated and presnt all the purchased coupons.
// it reset all the filters in the screen
getPurchasedCoupons() {
  this.sortKey = null;
  this.selectKey = null;
  // this.searchInput = null;
  this.customerService.getPurchasedCouponsService().subscribe(
      (resp) => {
        this.hasData = true;
        this.coupons = resp.json();
        this.sortArry(this.coupons);
        this.getMinMaxPrices();
  },
  (error) => {
    if (this.hasData) {
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    }
   });
  }

  // This method is activated based on event and activte the getCouponByTypeService service and present the relevant data
  // every time the user changed his selection
  onTypeChange(event) {
    if ( event.value !== null) {
    this.customerService.getCouponByTypeService(event.value).subscribe (
      (resp) => {
        this.coupons = resp.json();
        this.sortArry(this.coupons);
      },
      (error) => {
        // this.getPurchasedCoupons();
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      }
    );
    } else {
      this.getPurchasedCoupons();
    }
  }

  // This method is activated based on event and activte the getCouponByPriceService service and present the relevant data
  // every time the user changed the price
  onPriceChange(event) {
    this.customerService.getCouponByPriceService(event.value).subscribe (
      (resp) => {
        this.coupons = resp.json();
        this.sortArry(this.coupons);
        // this.maxPrice = this.price;
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
        this.coupons = [];
      }
    );
  }

  // This function responsible to sort the array accoring to the title of the coupon
  private sortArry(arryToSort: Coupon[]) {
    arryToSort.sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  private getMinMaxPrices() {
    this.coupons.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });
    this.minPrice = this.coupons[0].price;
    this.maxPrice = this.coupons[this.coupons.length - 1].price;
    this.price = this.maxPrice;
  }
}
