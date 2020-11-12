import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './model/user.model';
import { tap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000/user';

  // http client api for get user details
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + '/get-user')
       .pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.errorHandler));
    }

  // http client api for get user details by id
   getUserById(id: number): Observable<User> {
     return this.http.get<User>(this.baseUrl + '/get-user-by-id?id=' + id)
    .pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.errorHandler));
   }

  // http client api for create user
   createUser(user: User): Observable<User[]> {

    return this.http.post<User[]>(this.baseUrl + '/create-user', user)
       .pipe(tap(data => JSON.stringify(User), catchError(this.errorHandler)));
   }

  // http client api for update user
   updateUser(user: User): Observable<User> {
     console.log(user);
     return this.http.put<User>(this.baseUrl + '/update-user' , user)
     .pipe(tap(data => JSON.stringify(User), catchError(this.errorHandler)));
    }

  // http client api for delete user by id
   deleteUserById(id: number) {
     console.log(id);
     return this.http.delete(this.baseUrl + '/delete-user?id=' + id)
     .pipe(tap(data => JSON.stringify(id), catchError(this.errorHandler)));
   }

  // error handler
   errorHandler(error: HttpErrorResponse) {
     return observableThrowError(error.message || 'serviceError');
   }

   owlBotWord(wordInput: String) {
     console.log(wordInput);
     return this.http.post<String>(this.baseUrl + '/owlbot-word', {wordInput});
   }
}
