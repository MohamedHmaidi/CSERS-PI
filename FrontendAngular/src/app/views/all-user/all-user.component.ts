import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/service/AuthenticationService';
import { User } from '../../../core/service/AuthenticationService';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  users: User[] = [];

  showEditModal = false; 
  userToEdit: User; 
  editDialog :boolean=false;

 



  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
  

  updateUser(id: number, user: User): void {
    this.authService.updateUserInfo(id, user).subscribe(
      updatedUser => {
        // Handle success (e.g., show a success message)
        console.log('User updated successfully:', updatedUser);
      }, 
      error => {
        // Handle error (e.g., show an error message)
        console.error('Failed to update user:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(() => {
      // Handle success (e.g., show a success message)
      console.log('User deleted successfully');
    }, error => {
      // Handle error (e.g., show an error message)
      console.error('Failed to delete user:', error);
    });
  }

  confirmDelete(userId: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.deleteUser(userId);
    }
  }

  updateUserRole(userId: number, newRole: string): void {
    console.log('User before update. ID:', userId, 'New role:', newRole); 
  
    this.authService.updateUserRole(userId, newRole)
      .subscribe(updatedUser => {
        console.log('User role updated successfully:', updatedUser); 
      }, error => {
        console.error('Failed to update user role:', error);
      });
  }

  openEditDialog(userId: number, user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '450px',
      data: { user: user, userId: userId } // Pass the userId along with the user data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can perform any action here after the dialog is closed
    });
  }
  
}
