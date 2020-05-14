import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'create', component: CreateComponent},
    {path: 'poll/:id', component: PollComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
