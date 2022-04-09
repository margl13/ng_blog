import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from './AdminRoutingModule';
import {OverviewComponent} from "./overview/overview.component";


@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})

export class AdminModule { }
