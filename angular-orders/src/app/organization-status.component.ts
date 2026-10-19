import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrganizationService } from './organisation.service';

@Component({
  selector: 'app-organization-status',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="organization-panel">
      <h3>Organization Status</h3>
      <p>Active organization: {{ organization$ | async }}</p>
    </div>
  `,
})
export class OrganizationStatusComponent {
  private readonly organizationService = inject(OrganizationService);

  readonly organization$ = this.organizationService.selectedOrganization$;
}
