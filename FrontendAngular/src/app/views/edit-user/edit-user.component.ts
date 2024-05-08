import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService} from '../../../core/service/AuthenticationService';
import { User } from '../../../core/service/AuthenticationService';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number;
  user: User;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.authService.getUserById(this.userId).subscribe(user => {
        this.user = user;
      });
    });
  }

  onSubmit(): void {
    this.authService.updateUser(this.userId, this.user).subscribe(updatedUser => {
      // Handle success (e.g., show a success message)
      console.log('User updated successfully:', updatedUser);
    }, error => {
      // Handle error (e.g., show an error message)
      console.error('Failed to update user:', error);
    });
  }
}