
import { createApplication } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";
import { App } from "./app/app";

const tagName = "angular-orders";

if (!customElements.get(tagName)) {
  createApplication()
    .then((app) => {
      const element = createCustomElement(App, {
        injector: app.injector,
      });

      customElements.define(tagName, element);
    })
    .catch((error) => {
      console.error("Failed to initialize Angular Orders:", error);
    });
}
