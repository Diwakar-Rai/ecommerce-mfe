import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
}

