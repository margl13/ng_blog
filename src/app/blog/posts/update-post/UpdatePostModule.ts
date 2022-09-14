import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonMaterialModules} from "../../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UpdatePostComponent} from "./update-post.component";

@NgModule({
    imports: [CommonModule,
    CommonMaterialModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
    exports: [UpdatePostComponent],
    declarations: [UpdatePostComponent],
    providers: [],
})
export class UpdatePostModule {

}
