import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityPrintComponent } from './activity-print/activity-print.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path:'print', component: ActivityPrintComponent},
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
