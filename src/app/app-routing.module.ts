import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';

const routes: Routes = [
    { path: '', redirectTo: "/dashboard", pathMatch: "full" },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'restaurant/:id', component: RestaurantComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
