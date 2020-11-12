import { Component, OnInit, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public isLoading = false;
  public code;

  public validmessage = 'Login Successfully.';
  public invalidmessage = 'Enter Valid Credentials';
  public actionButtonLabel =  '';
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public setAutoHide = true;
  public autoHide = 2000;
  public action = true;
  public addExtraClass = false;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,   Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // snackbar
  validLoginOpenSnackbar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.validmessage, this.action ? this.actionButtonLabel : undefined, config);
  }

  invalidLoginOpenSnackbar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.invalidmessage, this.action ? this.actionButtonLabel : undefined, config);
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.getCode().subscribe( code => {
        this.code = code.number;
        console.log(this.code);
        if (this.code === 200) {
          this.validLoginOpenSnackbar();
          this.router.navigate(['/list-user']);
        } else {
          this.invalidLoginOpenSnackbar();
        }
    });
  }
}
