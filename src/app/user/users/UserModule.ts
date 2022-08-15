import {NgModule} from '@angular/core';
import {UsersComponent} from "./users.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [HttpClientModule,
        CommonMaterialModules, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [UsersComponent],
    declarations: [UsersComponent],
    providers: [],
})
export class UserModule {
}
