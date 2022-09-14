import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {UserInfoComponent} from "./user-info.component";
import {BlogModule} from "../../blog/BlogModule";

@NgModule({
    imports: [
        HttpClientModule,
        CommonMaterialModules,
        CommonModule,
    BlogModule],
    exports: [UserInfoComponent],
    declarations: [UserInfoComponent],
    providers: [],
})
export class UserInfoModule {
}
