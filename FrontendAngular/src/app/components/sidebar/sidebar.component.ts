import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(private router: Router) {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  logout(): void {
    // Remove user information from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');

    // Redirect to the login page
    this.router.navigate(['/auth/login']);
  }
}
