import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [],
    declarations: [RegisterComponent],
    providers: [],
})
export class RegisterModule {
}
