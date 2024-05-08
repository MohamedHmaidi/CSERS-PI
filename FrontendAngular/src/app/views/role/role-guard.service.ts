import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../../../core/service/AuthenticationService';
import { User } from '../../../core/service/AuthenticationService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  private apiUrl = 'http://localhost:8089/csers/';


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const user = this.authService.getCurrentUser();

    if (user && user.role === 'ADMIN') {
      return true;
    } else {
      // Redirect to a different route or show an error message
      this.router.navigate(['login']); // Example: Redirect to access denied page
      return false;
    }
  }
}