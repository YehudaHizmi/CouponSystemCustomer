import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'primeng/components/common/menuitem';
import { Customer } from './../common/Customer';
import { MenuItem, MessageService } from 'primeng/api';
import { WebApiCustomerService } from 'src/app/services/web-api-customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  customer: Customer = new Customer(null, '', '');
  request: Request;
  response: Response;
  prefixLogOutUrl: string;

  constructor(private customerService: WebApiCustomerService, private messageService: MessageService) {
    this.getCustomerInfo();
    this.prefixLogOutUrl = customerService.prefixLogOutUrl;
  }

  ngOnInit() {
    this.items = [
    {
      label: 'Coupon',
      items: [
          {label: 'Home',                 icon: 'pi pi-fw pi-home',              routerLink:   '/couponChart'         },
          {label: 'Purchase Coupon',      icon: 'pi pi-fw pi-plus',              routerLink:   '/purchaseCoupon'      },
          {label: 'Purchased Coupons',    icon: 'pi pi-fw pi-shopping-cart',     routerLink:   '/purchasedCoupons'    }
        ]
      }
    ];
  }


  public getCustomerInfo() {
    this.customerService.getCustomerInfo().subscribe(
      (resp) => {
        this.customer = resp.json();
      });
  }

  public logout() {
    this.customerService.logOutService(this.request, this.response).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'You Were Logged Out Successfully'});
        window.location.href = this.prefixLogOutUrl;
      },
      (error) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'Logged Out Failed'});
      });
  }

}
