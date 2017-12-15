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
  IsUserLoggedIn = false;
  isAdmin: boolean;


  constructor(private authService: AuthenticationService, private adminService: AdminService) {
    this.username = localStorage.getItem('username');
    this.isAdmin = this.adminService.isAdmin();
  }

  ngOnInit() {
    this.isAdmin = this.adminService.isAdmin();
    this.username = localStorage.getItem('username');
    this.authService.IsUserLoggedIn.subscribe(value => {
      this.changeUser();
      this.IsUserLoggedIn = value;
    });
  }

  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  changeUser() {
    this.username = localStorage.getItem('username')
    this.guest = this.authService.isGuestUser();
  }
}
