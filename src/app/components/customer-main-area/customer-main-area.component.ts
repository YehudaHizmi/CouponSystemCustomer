import { MessageService } from 'primeng/api';
import { WebApiCustomerService } from './../../services/web-api-customer.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';

@Component({
  selector: 'app-customer-main-area',
  templateUrl: './customer-main-area.component.html',
  styleUrls: ['./customer-main-area.component.css']
})
export class CustomerMainAreaComponent implements OnInit {

  availableCoupons: Coupon[];
  selectedCoupons: Coupon[];
  draggedCoupon: Coupon;
  cols: any[];
  couponTitle: string;
  legend = 'Purchase A Coupon';

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private customerService: WebApiCustomerService, private messageService: MessageService) {
  }

  // This method is activated from the onNgInit in order to present the user all the avilable coupons.
  getAllCoupons() {
    this.customerService.getAllCouponsService().subscribe(
      (resp) => {
        this.availableCoupons = resp.json();
        // Make default sort of companies array
        this.sortArry(this.availableCoupons);
    },
    (error) => {
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    });
  }

  // This method is activated from the onNgInit in order to present the user all the purchased coupons.
  // and the mark the user all the coupons that he has already purchased
  getPurchasedCoupons() {
    this.customerService.getPurchasedCouponsService().subscribe(
      (resp) => {
        this.selectedCoupons = resp.json();
        // Make default sort of companies array
        this.sortArry(this.selectedCoupons);
    },
    (error) => {
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    });
  }


  dragStart(event, coupon: Coupon) {
      this.draggedCoupon = coupon;
  }

  dragEnd(event) {
    this.draggedCoupon = null;
  }

  drop(event) {
    this.couponTitle = this.draggedCoupon.title;
    if (this.draggedCoupon) {
        this.customerService.purchaseCouponService(this.draggedCoupon).subscribe(
          (resp) => {
            this.getPurchasedCoupons();
            this.messageService.add({severity: 'success', summary: 'Coupon Was Added', detail: this.couponTitle +
            ' Was Purchased Successfully'});
          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Coupon Was\'t Purchased', detail: error._body});
          });
        this.draggedCoupon = null;
    }
}


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

  ngOnInit() {
    this.availableCoupons = [];
    this.selectedCoupons = [];
    this.getAllCoupons();
    this.getPurchasedCoupons();

    this.cols = [
      // { displayName: 'Id',          field: 'id',          type: 'number',   display: 'false'  },
      { displayName: 'Title',       field: 'title',       type: 'text',     display: 'true'   },
      { displayName: 'Start Date',  field: 'startDate',   type: 'date',     display: 'true'   },
      { displayName: 'End Date',    field: 'endDate',     type: 'date',     display: 'true'   },
      // { displayName: 'Amount',      field: 'amount',      type: 'number',   display: 'false'  },
      // { displayName: 'Type',        field: 'type',        type: 'text',     display: 'flase'  },
      // { displayName: 'Message',     field: 'message' ,    type: 'text',     display: 'flase'  },
      { displayName: 'Price',       field: 'price' ,      type: 'number',   display: 'true'   },
      // { displayName: 'Image',       field: 'image' ,      type: 'text',     display: 'false'  }
    ];
  }

}
