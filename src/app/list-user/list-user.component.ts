import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})

export class ListUserComponent implements OnInit {

  public user: User[];
  public value: number;
  public errorMsg;
  public displayedColumns: string[] = ['id', 'name', 'email'];
  public datasource = [];
  public id = 1;
  constructor(private router: Router, private userService: UserService ) { }


  ngOnInit() {
    this.getAllUsers();
  }

  // get all users information
  getAllUsers() {
    this.userService.getUsers()
    .subscribe ( data => {
       this.user = data,
       // tslint:disable-next-line: no-unused-expression
       error => this.errorMsg = error;
       this.datasource = this.user;
   });
  }

  // delete id form list
  removeFromList(item) {
     const index = this.user.indexOf(item);
     this.user.splice(index, 1); // Removes one element, starting from index
   }

  // delete user from list
  deleteUser(id: number) {
    this.userService.deleteUserById(id)
      .subscribe(successCode => {
           this.removeFromList(id);
        });
  }

  // route for add user
  adduser() {
    this.router.navigate(['add-user']);
  }

  // route for edit user
  updateUser() {
    this.router.navigate(['edit-user']);
  }


  // delete user by id
 deleteByID(value) {
   console.log('valllllllllllllllll', value);
  for (let u of this.user) {
    if (u.id == value) {
      console.log('uuuuuuuiddddd' , u.id)
      this.userService.deleteUserById(value)
      .subscribe(successCode => {
           this.removeFromList(value);
           this.getAllUsers();
        });
    }
  }
 }
}
