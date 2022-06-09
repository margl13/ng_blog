import {NgModule} from '@angular/core';
import {LoginComponent} from './LoginComponent';
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule {
}
