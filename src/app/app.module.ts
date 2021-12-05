import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './AppRoutingModule'
import { AppComponent } from './app.component';
import {BlogModule} from "./blog/BlogModule";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonMaterialModules} from "./common/material/CommonMaterialModules";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginModule} from "./login/LoginModule";
import {AuthModule} from "./common/auth/AuthModule";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        AuthModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonMaterialModules,
        LoginModule,
        BlogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
