import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthRequiredComponent } from './auth-required/auth-required.component';
import { AuthComponent } from './auth/auth.component';
import { PollComponent } from './poll/poll.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { SingleChoiceButtonComponent } from './single-choice-button/single-choice-button.component';
import { OwnerOptionsComponent } from './owner-options/owner-options.component';
import { NonvoterComponent } from './nonvoter/nonvoter.component';
import { ResultsComponent } from './results/results.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { RankedChoiceComponent } from './ranked-choice/ranked-choice.component';
import { YesNoPipe } from './yes-no.pipe';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { BinaryScoreChoiceComponent } from './binary-score-choice/binary-score-choice.component';
import { SimpleResultsComponent } from './simple-results/simple-results.component';
import { IRVResultsComponent } from './irv-results/irv-results.component';
import { SmithResultsComponent } from './smith-results/smith-results.component';
import { HistoryComponent } from './history/history.component';
import { TrinaryScoreChoiceComponent } from './trinary-score-choice/trinary-score-choice.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        AuthRequiredComponent,
        AuthComponent,
        PollComponent,
        SingleChoiceComponent,
        SingleChoiceButtonComponent,
        OwnerOptionsComponent,
        NonvoterComponent,
        ResultsComponent,
        CreateComponent,
        RankedChoiceComponent,
        YesNoPipe,
        DashboardItemComponent,
        BinaryScoreChoiceComponent,
        SimpleResultsComponent,
        IRVResultsComponent,
        SmithResultsComponent,
        HistoryComponent,
        TrinaryScoreChoiceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
