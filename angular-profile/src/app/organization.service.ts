import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const ORGANIZATION_CHANGED_EVENT = 'ecommerce:organization-changed';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService implements OnDestroy {
  private readonly selectedOrganizationSubject = new BehaviorSubject<string>('Acme');

  readonly selectedOrganization$ = this.selectedOrganizationSubject.asObservable();

  private readonly organizationChangedHandler = (event: Event) => {
    const customEvent = event as CustomEvent<{
      organization?: string;
    }>;

    const organization = customEvent.detail?.organization;

    if (typeof organization === 'string' && organization.trim()) {
      this.selectedOrganizationSubject.next(organization);
    }
  };

  private readonly organizationChannel = new BroadcastChannel('ecommerce-organization-channel');

  private readonly broadcastMessageHandler = (
    event: MessageEvent<{
      type?: string;
      organization?: string;
    }>,
  ) => {
    const message = event.data;

    if (
      message?.type === 'organization-changed' &&
      typeof message.organization === 'string' &&
      message.organization.trim()
    ) {
      this.selectedOrganizationSubject.next(message.organization);
    }
  };

  constructor() {
    window.addEventListener(ORGANIZATION_CHANGED_EVENT, this.organizationChangedHandler);

    this.organizationChannel.addEventListener('message', this.broadcastMessageHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener(ORGANIZATION_CHANGED_EVENT, this.organizationChangedHandler);

    this.organizationChannel.removeEventListener('message', this.broadcastMessageHandler);

    this.organizationChannel.close();
  }
}
