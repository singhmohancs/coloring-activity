import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ActivityPageComponent } from './components/activity-page/activity-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { ActivityBuilderRoutingModule } from './activity-builder-routing.module';
import { ActivityBuilderComponent } from './activity-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SvgPainterDirective } from './svg-painter.directive';
import { InlineSVGModule } from 'ng-inline-svg';
import { SvgPainterComponent } from './components/svg-painter/svg-painter.component';
import { ActivityBuilderService } from './activity-builder.service';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    InlineSVGModule.forRoot(),
    ActivityBuilderRoutingModule,
  ],
  declarations: [ActivityBuilderComponent, IntroductionComponent, ActivityPageComponent, OverviewPageComponent, SvgPainterDirective, SvgPainterComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ActivityBuilderService]
})
export class ActivityBuilderModule { }
