import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view'

export const routes: Routes = [
    { path: 'home', component: ViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {
}
