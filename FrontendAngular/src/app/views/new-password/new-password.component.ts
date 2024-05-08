import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/AuthenticationService';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  changePasswordForm = {
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitForm() {
    const email = localStorage.getItem('email');
    const newPassword = this.changePasswordForm.newPassword;
    const confirmPassword = this.changePasswordForm.confirmPassword;

    // Check if passwords match
    if (newPassword === confirmPassword) {
      this.authService.changePassword(email, newPassword).subscribe(response => {
        if (response.includes('Password has been changed')) {
          this.router.navigate(['auth/login']);
        } else {
          this.router.navigate(['auth/login']);
        }
        this.router.navigate(['auth/login']);
      });
      this.router.navigate(['auth/login']);
    } else {
      window.alert("Inputs don't match.")
    }
  }

  cancel() {
    console.log('Password change cancelled');
    // Add logic if needed
  }
}
