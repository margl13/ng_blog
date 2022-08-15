import {NgModule} from "@angular/core";
import {UpdateUserComponent} from "./update-user.component";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule],
    exports: [UpdateUserComponent],
    declarations: [UpdateUserComponent],
    providers: [],
})
export class UpdateUserModule {
}
