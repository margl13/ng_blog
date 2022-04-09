import {NgModule} from '@angular/core';
import {LoginComponent} from './LoginComponent';
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./LoginRoutes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(LoginRoutes)
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule {
}
