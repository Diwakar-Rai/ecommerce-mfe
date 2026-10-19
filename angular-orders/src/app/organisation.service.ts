import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const ORGANIZATION_CHANGED_EVENT = 'ecommerce:organization-changed';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private readonly selectedOrganizationSubject = new BehaviorSubject<string>('Acme');

  readonly selectedOrganization$ = this.selectedOrganizationSubject.asObservable();
  private readonly organizationChannel = new BroadcastChannel('ecommerce-organization-channel');

  selectOrganization(organization: string): void {
    // Update reactive state inside the Orders application.
    this.selectedOrganizationSubject.next(organization);

    // Publish the change across the microfrontend boundary.
    window.dispatchEvent(
      new CustomEvent(ORGANIZATION_CHANGED_EVENT, {
        detail: { organization },
      }),
    );

    this.organizationChannel.postMessage({
      type: 'organization-changed',
      organization,
    });
  }
}
