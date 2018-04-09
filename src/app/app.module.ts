import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {DbService} from './services/db.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from './environments';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import {AuthGuard} from './guards/auth.guard';
import {MaterialModule} from './material/material.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UploadService} from './services/upload.service';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { PostComponent } from './components/post/post.component';
import { ReversePipe } from './pipes/reverse.pipe';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import { FooterComponent } from './footer/footer.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BeforeNowPipe } from './pipes/before-now.pipe';
import { ProfileComponent } from './profile/profile.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import {DisconnectGuard} from './disconnect.guard';
import { FastpostComponent } from './fastpost/fastpost.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { StartHomeComponent } from './start-home/start-home.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AuthComponent,
    UserDetailsComponent,
    SignupComponent,
    AboutusComponent,
    NewMessageComponent,
    PostComponent,
    ReversePipe,
    FooterComponent,
    EditProfileComponent,
    BeforeNowPipe,
    ProfileComponent,
    SendMessageComponent,
    MessagesComponent,
    MessageComponent,
    FastpostComponent,
    ChangePassComponent,
    StartHomeComponent,
    PostsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    DbService,
    AuthGuard,
    DisconnectGuard,
    UploadService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SendMessageComponent,
    ChangePassComponent
  ]
})
export class AppModule { }
