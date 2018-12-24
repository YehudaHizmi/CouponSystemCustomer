import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
import { WebApiCustomerService } from 'src/app/services/web-api-customer.service';
import { MessageService, SelectItem } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-purchase-coupon',
  templateUrl: './purchase-coupon.component.html',
  styleUrls: ['./purchase-coupon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseCouponComponent implements OnInit {

  availableCoupons: Coupon[];
  selectedCoupon: Coupon;
  alreadyPurchasedCoupons: Coupon[];
  headr = 'Available Coupons';
  displayDialog: boolean;
  sortOptions: SelectItem[];

  sortKey: string;
  sortField: string;
  sortOrder: number;
  value: string;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private customerService: WebApiCustomerService, private messageService: MessageService) {
    // this method populate the alreadyPurchasedCoupons array with all the purchased coupons
    this.getPurchasedCoupons();
  }


  ngOnInit() {
     // this method populate the availableCoupons array with all the available coupons
    this.getAllCoupons();
    this.sortOptions = this.customerService.sortOptions;

    // this.sortOptions = [
    //   {label: 'Type', value: 'type'},
    //   {label: 'Price L2H', value: 'price'},
    //   {label: 'Price H2L', value: '!price'},
    //   {label: 'Start Date', value: 'startDate'},
    //   {label: 'End Date', value: 'endDate'},
    // ];
  }


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

  // This methos is activated from the ngOnInit and it activates the getAllCouponsService service and populate the
  // availableCoupons array with all the available coupons
  getAllCoupons() {
    this.customerService.getAllCouponsService().subscribe(
      (resp) => {
        this.availableCoupons = resp.json();
        this.sortArry(this.availableCoupons);
        if (this.alreadyPurchasedCoupons != null && this.alreadyPurchasedCoupons.length !== 0) {
          this.markAllreadyPurchasedCoupons();
        }
    },
    (error) => {
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    });
  }

  // This methos is activated from the constructor and it activates the getPurchasedCouponsService service and populate the
  // alreadyPurchasedCoupons array with all the purchased coupons
  getPurchasedCoupons() {
      this.customerService.getPurchasedCouponsService().subscribe(
          (resp) => {
            this.alreadyPurchasedCoupons = resp.json();
      },
      (error) => {
         // Do Nothing
        });
    }

  // This method mark in the main screen (where the user sees all the available coupons) all the coupons that he already purchased
  private markAllreadyPurchasedCoupons() {
    this.availableCoupons.forEach((coupon) => {
      if (this.alreadyPurchasedCoupons.find(({id}) => coupon.id === id)) {
        coupon.purchased = true;
      }
    });
  }

  // this method is activated once the user press the detailes button and it present the infromation of the coupon and the option
  // to purchase it in a popup window
  selectCoupon(event: Event, coupon: Coupon) {
    this.selectedCoupon = coupon;
    // console.log(this.selectCoupon);
    this.displayDialog = true;
     event.preventDefault();
  }


  onDialogHide() {
    this.selectedCoupon = null;
  }

  // This method is activated from the popup window - when the user want to purchase the coupon.
  // It activates the purchaseCouponService service and mark this coupon as a purchased coupon
  purchaseCoupon() {
    this.customerService.purchaseCouponService(this.selectedCoupon).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Coupon Was Purchased', detail: this.selectedCoupon.title +
        ' Was Purchased Successfully'});
        this.selectedCoupon.amount = this.selectedCoupon.amount - 1;
        this.selectedCoupon.purchased = true;
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Coupon Was\'t Purchased', detail: error._body});
      });
      this.displayDialog = false;
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

}
