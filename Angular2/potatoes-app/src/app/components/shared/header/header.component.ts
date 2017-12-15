import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../authentication/auth.service';
import { AdminService } from '../../../core/services/admin/admin.service';

@Component({
  selector: 'potatoes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isIn = false;

  username = localStorage.getItem('username');
  guest: boolean;
  IsUserLoggedIn: boolean;
  isAdmin: boolean;


  constructor(private authService: AuthenticationService, private adminService: AdminService) {
    this.username = localStorage.getItem('username');
    this.isAdmin = this.adminService.isAdmin();
    this.authService.isUserLogged.subscribe(isLogged => this.IsUserLoggedIn = isLogged)
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
  }

  ngOnInit() {
    console.log(this.isAdmin)
    this.isAdmin = this.adminService.isAdmin();
    this.username = localStorage.getItem('username');
    this.IsUserLoggedIn = this.adminService.isUserLogged();
  }

  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

}
