import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name: string;
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authService.getName().subscribe( uname => {
      console.log(uname);
      this.name = uname.text;
    });
  }


  // session suspended
  onLogout() {
    this.authService.logout();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
