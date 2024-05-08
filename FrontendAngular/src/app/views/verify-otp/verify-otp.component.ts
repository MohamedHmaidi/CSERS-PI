import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/service/AuthenticationService';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  verifyOTPForm = {
    otp: 0
  };
  otpError: string = ''; // Variable to hold error message

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  submitForm() {
    const email = localStorage.getItem('email');
    const otp = this.verifyOTPForm.otp;

    this.authService.verifyOTP(otp, email).subscribe({
      next: (response: any) => {
        if (response.message === 'OTP verified!') {  // Adjust check based on response map 
          this.router.navigate(['auth/new-password']);
        } else {
          this.otpError = 'An error occurred during OTP verification'; // Generic error
        }
      },
      error: (error) => {
        console.error('Verification error:', error);
        if (error.status === 403) { // Example of handling a specific error code
          this.otpError = 'Incorrect OTP. Please try again.';
        } else {
          this.otpError = 'An error occurred during OTP verification.';
        }
      }
    });
  }

  cancel() {
    console.log('Verification cancelled');
    // Add logic if needed
    this.router.navigate(['auth/login']);
  }

  resendOTP() {
    console.log('Resending OTP...');
    // Add logic to resend OTP if needed
  }
}
