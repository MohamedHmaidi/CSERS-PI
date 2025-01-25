import { AuthService} from '../../../core/service/AuthenticationService';
import { User } from '../../../core/service/AuthenticationService';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, userId: number },
    private authService: AuthService
  ) {
    this.user = { ...data.user };
    this.userId = data.userId; // Assign userId from data
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    // Fetch the complete user object first
    this.authService.getUserById(this.userId).subscribe(
      (user: User) => {
        // Update all fields
        user.email = this.user.email;
        user.firstName = this.user.firstName;
        user.lastName = this.user.lastName;

        // Call updateUser method with the complete user object
        this.authService.updateUserInfo(this.userId, user).subscribe(
          updatedUser => {
            console.log('User updated successfully:', updatedUser);
            // Close the dialog after successfully updating the user
            this.dialogRef.close(updatedUser);
          },
          error => {
            console.error('Failed to update user:', error);
            // You can handle error cases here, such as displaying an error message
          }
        );
      },
      error => {
        console.error('Failed to fetch user:', error);
        // You can handle error cases here, such as displaying an error message
      }
    );
  }

  cancel(): void {
    // You can implement cancel logic here, if needed
    this.dialogRef.close();
  }
}