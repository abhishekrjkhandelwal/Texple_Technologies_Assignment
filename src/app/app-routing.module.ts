import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from './Auth/auth.guard';
import { OwlbotComponent } from './owlbot/owlbot.component';


const routes: Routes = [
//  { path: '' , component: AddUserComponent},
  { path: '', component: LoginComponent , data: {animation: 'Login'}},
  { path: 'login', component: LoginComponent , data: {animation: 'Login'}},
  { path: 'signup', component: SignUpComponent, data: {animation: 'SignUp' }},
  { path: 'add-user', component: AddUserComponent,  canActivate : [AuthGuard]},
  { path: 'list-user', component: ListUserComponent,  canActivate : [AuthGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate : [AuthGuard]},
  { path: 'owlbot-word', component: OwlbotComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard ]
})
export class AppRoutingModule { }
