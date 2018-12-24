import { Coupon } from './../components/common/Coupon';
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class WebApiCustomerService {

  sortOptions: SelectItem[];
  couponTypes: any[];
  prefixCustomerUrl = 'http://localhost:8080/customer/';
  prefixLogOutUrl = 'http://localhost:8080/';



  constructor( private http: Http ) {
    this.sortOptions = [
      {label: 'Type', value: 'type'},
      {label: 'Price L2H', value: 'price'},
      {label: 'Price H2L', value: '!price'},
      {label: 'Start Date', value: 'startDate'},
      {label: 'End Date', value: 'endDate'},
    ];

    this.couponTypes = [
      {label: 'Resturant' , value: 'RESTURANT'},
      {label: 'Electricity', value: 'ELECTRICITY'},
      {label: 'Food', value: 'FOOD'},
      {label: 'Health', value: 'HEALTH'},
      {label: 'Sports', value: 'SPORTS'},
      {label: 'Camping', value: 'CAMPING'},
      {label: 'Travelling', value: 'TRAVELLING'},
    ];
  }

  public getAllCouponsService() {
    // return this.http.get('http://localhost:8080/customer/get-all-coupons');
    return this.http.get(this.prefixCustomerUrl + 'get-all-coupons');
  }

  public getPurchasedCouponsService() {
    // return this.http.get('http://localhost:8080/customer/get-purchased-coupons');
    return this.http.get(this.prefixCustomerUrl + 'get-purchased-coupons');
  }

  public purchaseCouponService(coupon: Coupon) {
    // return this.http.post('http://localhost:8080/customer/purchase-coupon', coupon);
    return this.http.post(this.prefixCustomerUrl + 'purchase-coupon', coupon);
  }

  public getCouponByTypeService(type: string) {
    // return this.http.get('http://localhost:8080/customer/coupon-by-type?type=' + type);
    return this.http.get(this.prefixCustomerUrl + 'coupon-by-type?type=' + type);
  }

  public getCouponByPriceService(price: number) {
    // return this.http.get('http://localhost:8080/customer/coupon-by-price?price=' + price);
    return this.http.get(this.prefixCustomerUrl + 'coupon-by-price?price=' + price);
  }

  public getCustomerInfo() {
    // return this.http.get('http://localhost:8080/customer/customer-info');
    return this.http.get(this.prefixCustomerUrl + 'customer-info');
  }

  /**********************************************************************************/
  /*********************Services for the logout method*******************************/
  /**********************************************************************************/
  public logOutService(request, response) {
    return this.http.post(this.prefixLogOutUrl + 'logout', request, response);
  }


}
