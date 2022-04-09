import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './AppRoutingModule'
import { AppComponent } from './app.component';
import {BlogModule} from "./blog/BlogModule";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonMaterialModules} from "./common/material/CommonMaterialModules";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginModule} from "./components/login/LoginModule";
import {AuthModule} from "./common/auth/AuthModule";
import {RegisterModule} from "./components/register/RegisterModule";
import {UserModule} from "./common/user/users/UserModule";
import {UserInfoModule} from "./common/user/user-info/UserInfoModule";
import {UpdateUserModule} from "./common/user/update-user/UpdateUserModule";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./common/interceptors/jwt.interceptor";
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './blog/posts/single-post/single-post.component';
import {SinglePostModule} from "./blog/posts/single-post/SinglePostModule";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        AuthModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonMaterialModules,
        LoginModule,
        BlogModule,
        RegisterModule,
        UserModule,
        UserInfoModule,
        UpdateUserModule
    ],
  providers: [JwtHelperService,
      {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
       multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
