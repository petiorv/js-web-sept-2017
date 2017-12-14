import { Component, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthenticationService } from './components/authentication/auth.service';
import { LoginModel } from './core/models/auth/login.model';

@Component({
  selector: 'potatoes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'potatoes';
  constructor(private authService: AuthenticationService){}
  ngOnInit(){ 
  }
  
}
