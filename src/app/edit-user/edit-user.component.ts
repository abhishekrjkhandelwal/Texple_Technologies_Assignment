import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})


export class EditUserComponent implements OnInit {


  public user: User;
  public value;
  public router: any;
  public statusCode: any;
  public edited = false;

  // object of formgroup
  editform = new FormGroup ({
    id: new FormControl('',  Validators.required),
    name : new FormControl ('', Validators.required),
    email : new FormControl ('', Validators.required),
    password : new FormControl ('', Validators.required),
    mobileno : new FormControl ('', Validators.required),
  });


  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit() {
    }

    // get user by id form user service
    getUserByID() {
     this.edited = true;
     this.userService.getUserById(this.editform.value.id).subscribe( data => {
        this.value = data[0];
     });
    }

    // update the user information
    onUpdate() {
    this.userService.updateUser(this.editform.value)
        .subscribe( data => {
          this.value = data,
          console.log(this.value);
        });
    this.edited = false;
    }
}

