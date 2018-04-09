import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {AboutusComponent} from './components/aboutus/aboutus.component';
import {SignupComponent} from './components/signup/signup.component';
import {NewMessageComponent} from './components/new-message/new-message.component';
import {ProfileComponent} from './profile/profile.component';
import {MessagesComponent} from './messages/messages.component';
import {DisconnectGuard} from './disconnect.guard';
import {StartHomeComponent} from './start-home/start-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: StartHomeComponent, canActivate: [DisconnectGuard]},
  { path: 'login', component: LoginComponent, canActivate: [DisconnectGuard]},
  { path: 'about', component: AboutusComponent, canActivate: [DisconnectGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [DisconnectGuard]},
  { path: 'posts/me', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'posts/new', component: NewMessageComponent, canActivate: [AuthGuard]},
  { path: 'profile/me', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
