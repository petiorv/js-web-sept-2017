import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../authentication/auth.service';

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


  constructor(private authService: AuthenticationService) {
    this.username = localStorage.getItem('username');
   
  }

  ngOnInit() {    
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
