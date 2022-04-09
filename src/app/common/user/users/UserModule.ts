import {NgModule} from '@angular/core';
import {UsersComponent} from "./Users.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonMaterialModules} from "../../material/CommonMaterialModules";
import {UsersRouting} from "./UsersRouting";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [HttpClientModule,
        RouterModule.forChild(UsersRouting),
        CommonMaterialModules, CommonModule],
    exports: [UsersComponent],
    declarations: [UsersComponent],
    providers: [],
})
export class UserModule {
}
