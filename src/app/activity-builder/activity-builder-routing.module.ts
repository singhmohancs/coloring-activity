import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityBuilderComponent } from './activity-builder.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ActivityPageComponent } from './components/activity-page/activity-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';

const routes: Routes = [
  {
    path: 'activity-builder',
    component: ActivityBuilderComponent,
    children: [
      {
        path: '',
        component: IntroductionComponent,
        pathMatch: 'full'
      },
      {
        path: 'activity/:id',
        component: ActivityPageComponent,
      },
      {
        path: 'overview',
        component: OverviewPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ActivityBuilderRoutingModule { }
