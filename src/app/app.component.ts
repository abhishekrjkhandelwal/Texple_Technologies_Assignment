import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Auth/auth.service';
import { slideInAnimation } from './router-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
      this.authService.autoAuthUser();
  }
}
