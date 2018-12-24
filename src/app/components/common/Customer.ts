import { Coupon } from './Coupon';

export class Customer {

  constructor(public id: number, public custName: string, public password: string, public coupons?: Coupon[]) {}

}
