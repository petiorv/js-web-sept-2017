import { Component } from '@angular/core';
import { LoginModel } from '../../../core/models/auth/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../../core/services/validation/validation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model: LoginModel;
  public loginFail: boolean;
  public username: string;
  public checker: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private validationService: ValidationService
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
    this.checker = true;
  }

  login(): void {
    this.checker = this.validationService.validateObj(this.model)
    if (this.checker) {
      this.authService.login(this.model)
        .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
        }
        )
    }
    setTimeout(() => {
      this.checker = true;
    }, 3000)
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data): void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('pass', data['confirm']);
    this.loginFail = false;
    if (localStorage.getItem('username') == 'petio') {
      this.authService.isAdmin.emit(true);
    } else {
      this.authService.isAdmin.emit(false);
    }

    this.authService.isUserLogged.emit(true)
    this.router.navigate(['/home']);
  }
}