import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../core/models/auth/register.model';
import { AuthenticationService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../../core/services/validation/validation.service';

@Component({
  selector: 'potatoes-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public checker: boolean;
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;
  public errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router, private validationService: ValidationService) {
    this.model = new RegisterModel("", "", "", "", "");
    this.checker = true;
  }

  ngOnInit() {

  }
  submitRegister(): void {
    if (this.model.password !== this.model.confirm) {
      this.registerFail = true;
      this.errorMsg = "Password don't match";
      return;
    }

    this.checker = this.validationService.validateObj(this.model);

    if (this.checker) {
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
        })
    }

    setTimeout(() => {
      this.checker = true;
    }, 3000)

  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }
}
