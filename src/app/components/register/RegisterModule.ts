import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {RegisterRoutes} from "./RegisterRoute";

@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(RegisterRoutes)
    ],
    exports: [],
    declarations: [RegisterComponent],
    providers: [],
})
export class RegisterModule {
}
