import { Component, OnDestroy, OnInit } from '@angular/core';
import { orders, type Order } from './orders.data';
import { Subscription } from 'rxjs';
import { OrganizationService } from './organisation.service';
import { OrganizationStatusComponent } from './organization-status.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrganizationStatusComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  orders = orders;
  selectedOrder: Order | undefined;
  currentPath = '/orders';
  selectedOrganization = 'Acme';

  private organizationSubscription?: Subscription;

  constructor(private organizationService: OrganizationService) {}

  private readonly shellNavigationHandler = (event: Event) => {
    const detail = (event as CustomEvent<{ pathname: string }>).detail;

    if (detail?.pathname) {
      this.setRoute(detail.pathname);
    }
  };

  ngOnInit() {
    this.setRoute(window.location.pathname);

    this.organizationSubscription = this.organizationService.selectedOrganization$.subscribe(
      (organization) => {
        this.selectedOrganization = organization;
        console.log('Orders received organization:', organization);
      },
    );

    window.addEventListener('ecommerce:shell-navigation', this.shellNavigationHandler);
  }

  ngOnDestroy() {
    this.organizationSubscription?.unsubscribe();
    window.removeEventListener('ecommerce:shell-navigation', this.shellNavigationHandler);
  }

  private setRoute(pathname: string) {
    this.currentPath = pathname;

    const match = pathname.match(/^\/orders\/([^/]+)\/?$/);
    this.selectedOrder = match ? this.orders.find((order) => order.id === match[1]) : undefined;
  }

  openOrder(orderId: string) {
    window.dispatchEvent(
      new CustomEvent('ecommerce:orders-navigate', {
        detail: { pathname: `/orders/${orderId}` },
      }),
    );
  }

  backToOrders() {
    window.dispatchEvent(
      new CustomEvent('ecommerce:orders-navigate', {
        detail: { pathname: '/orders' },
      }),
    );
  }

  orderTotal(order: Order) {
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  selectOrganization(organization: string): void {
    this.organizationService.selectOrganization(organization);
  }
}
