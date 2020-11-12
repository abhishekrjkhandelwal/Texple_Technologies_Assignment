import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  constructor(private fromBuilder: FormBuilder, private router: Router, private userService: UserService) {}
  public submitted = false;
  public  user: User[];
  public statusCode: any;

// object of form group
 addForm = new FormGroup({
    email : new FormControl('', Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/)),
    password: new FormControl('', Validators.pattern('(?=.{8,})')),
    name: new FormControl('', Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)),
    mobileno: new FormControl('',  Validators.pattern(/^((\+){1}91){1}[1-9]{1}[0-9]{9}$/)),
  });

  ngOnInit() {
  }

  // subscribtion for create a user
  createUser() {
    console.log(this.addForm.value);
    this.userService.createUser(this.addForm.value)
    .subscribe( data => {
      this.router.navigate(['list-user']);
    });
  }

  // submit method
  onSubmit() {
    this.submitted = true;
    const user1 = this.addForm.value;
    this.userService.getUsers()
      .subscribe(user => {
             const maxIndex = user.length - 1;
             const userWithMaxIndex = user[maxIndex];
             const userId = userWithMaxIndex.id + 1;

             user1.id = userId;

             console.log(user1, 'this is form data---');

             // create user
             this.userService.createUser(user1)
             .subscribe( succussCode => {
               this.statusCode = succussCode;
               this.createUser();
             },
             errorCode => this.statusCode = errorCode
             );
      });
  }
}
