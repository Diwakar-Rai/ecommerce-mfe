
import {
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { orders, type Order } from "./orders.data";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit, OnDestroy {
  orders = orders;
  selectedOrder: Order | undefined;
  currentPath = "/orders";

  private readonly shellNavigationHandler = (event: Event) => {
    const detail = (
      event as CustomEvent<{ pathname: string }>
    ).detail;

    if (detail?.pathname) {
      this.setRoute(detail.pathname);
    }
  };

  ngOnInit() {
    this.setRoute(window.location.pathname);

    window.addEventListener(
      "ecommerce:shell-navigation",
      this.shellNavigationHandler,
    );
  }

  ngOnDestroy() {
    window.removeEventListener(
      "ecommerce:shell-navigation",
      this.shellNavigationHandler,
    );
  }

  private setRoute(pathname: string) {
    this.currentPath = pathname;

    const match = pathname.match(/^\/orders\/([^/]+)\/?$/);
    this.selectedOrder = match
      ? this.orders.find((order) => order.id === match[1])
      : undefined;
  }

  openOrder(orderId: string) {
    window.dispatchEvent(
      new CustomEvent("ecommerce:orders-navigate", {
        detail: { pathname: `/orders/${orderId}` },
      }),
    );
  }

  backToOrders() {
    window.dispatchEvent(
      new CustomEvent("ecommerce:orders-navigate", {
        detail: { pathname: "/orders" },
      }),
    );
  }

  orderTotal(order: Order) {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
