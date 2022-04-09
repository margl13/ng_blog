import {NgModule} from "@angular/core";
import {UpdateUserComponent} from "./update-user.component";
import {CommonMaterialModules} from "../../material/CommonMaterialModules";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule],
    exports: [UpdateUserComponent],
    declarations: [UpdateUserComponent],
    providers: [],
})
export class UpdateUserModule {
}
