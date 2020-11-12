import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public isLoading = false;


  public code;
  public validmessage = 'Registeration Successfully.';
  public invalidmessage = 'Registeration Faild.';
  public actionButtonLabel =  '';
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public setAutoHide = true;
  public autoHide = 2000;
  public action = true;
  public addExtraClass = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

   ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
      email: ['', [Validators.required,   Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/)]],
      password: ['', [Validators.required,  Validators.minLength(8) ]],
      cpassword: ['', [Validators.required, Validators.minLength(8) ]],
    });
  }

  // snackbar
  validRegisterOpenSnackbar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.validmessage, this.action ? this.actionButtonLabel : undefined, config);
  }

  // snackbar
  invalidRegisterOpenSnackbar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.invalidmessage, this.action ? this.actionButtonLabel : undefined, config);
  }

  // signup
  onSignup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.registerForm.value.password === this.registerForm.value.cpassword) {
       
       this.authService.createUser( this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(response => {
      
        if(response.code == 200) {
          this.validRegisterOpenSnackbar();
          this.router.navigate(['/login']);
               }
        else {
           this.invalidRegisterOpenSnackbar();
        }
               
        });
    }
   }
}
