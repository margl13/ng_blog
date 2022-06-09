import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonMaterialModules} from "../../material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {UserInfoComponent} from "./user-info.component";

@NgModule({
    imports: [
        HttpClientModule,
        CommonMaterialModules,
        CommonModule],
    exports: [UserInfoComponent],
    declarations: [UserInfoComponent],
    providers: [],
})
export class UserInfoModule {
}
