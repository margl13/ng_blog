import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register.component";


@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [RegisterComponent],
    providers: [],
})
export class RegisterModule {
}
