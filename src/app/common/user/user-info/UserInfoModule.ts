import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonMaterialModules} from "../../material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {UserInfoComponent} from "./user-info.component";
import {RouterModule} from "@angular/router";
import {UserInfoRoutes} from "./UserInfoRoutes";

@NgModule({
    imports: [
        HttpClientModule,
        CommonMaterialModules,
        CommonModule,
        RouterModule.forChild(UserInfoRoutes)],
    exports: [UserInfoComponent],
    declarations: [UserInfoComponent],
    providers: [],
})
export class UserInfoModule {
}
