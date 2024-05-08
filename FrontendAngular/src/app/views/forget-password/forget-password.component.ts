import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm = {
    email: ''
  };
  emailError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  submitForm() {
    const email = this.forgetPasswordForm.email;
    if (!this.validateEmail(email)) {
      this.emailError = 'Email must end with \'@esprit.tn\'.';
      return; // Do not proceed further if email is invalid
    }

    localStorage.setItem('email', email);
    this.authService.verifyEmail(email).subscribe({
      next: () => {
        console.log('Email sent for verification');
      },
      error: (error) => {
        this.router.navigate(['auth/verifyotp']);
        console.error("Email sent for verification:", error);
      }
    });
  }

  validateEmail(email: string): boolean {
    return email.endsWith('@esprit.tn');
  }

  cancel() {
    // Implement cancellation logic if needed
  }

}
