import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';
import { CreateComponent } from './create/create.component';
import { HistoryComponent } from './history/history.component';
import { VotingMethodsComponent } from './voting-methods/voting-methods.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'create', component: CreateComponent},
    {path: 'methods', component: VotingMethodsComponent},
    {path: 'poll/:id', component: PollComponent},
    {path: 'history', component: HistoryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
