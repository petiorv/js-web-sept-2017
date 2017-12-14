import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../core/models/auth/register.model';
import { AuthenticationService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'potatoes-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;
  public errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.model = new RegisterModel("", "", "", "", "");
  }

  ngOnInit() {

  }
  submitRegister(): void {
    if (this.model.password !== this.model.confirm) {
      this.registerFail = true;
      this.errorMsg = "Password don't match";
      return;
    }
    this.authService.register(this.model)
      .subscribe(
      data => {
        this.successfulRegister(data);
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 3000);
      },
      err => {
        this.registerFail = true;
        this.errorMsg = "User already exist";
      }
      )
  }

  checkPassword() {

  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }
}
