import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  isEditing = false;

  profile = {
    id: 'CUS-1001',
    name: 'Diwakar Rai',
    email: 'diwakar@example.com',
    phone: '+91 98765 43210',
    address: '123 MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
  };

  startEditing(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    this.isEditing = false;
    console.log('Profile saved locally:', this.profile);
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  selectedOrganization = 'Acme';

  private organizationSubscription?: Subscription;

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.organizationSubscription = this.organizationService.selectedOrganization$.subscribe(
      (organization) => {
        this.selectedOrganization = organization;
        console.log('Profile received organization:', organization);
        this.changeDetectorRef.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {
    this.organizationSubscription?.unsubscribe();
  }
}
