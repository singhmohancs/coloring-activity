import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ActivityPageComponent } from './components/activity-page/activity-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { ActivityBuilderRoutingModule } from './activity-builder-routing.module';
import { ActivityBuilderComponent } from './activity-builder.component';
import { SvgPainterDirective } from './svg-painter.directive';
import { InlineSVGModule } from 'ng-inline-svg';
import { SvgPainterComponent } from './components/svg-painter/svg-painter.component';
import { ActivityBuilderService } from './activity-builder.service';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ActivityCaptionComponent } from './components/activity-caption/activity-caption.component';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
    SwiperModule,
    ActivityBuilderRoutingModule,
  ],
  declarations: [ActivityBuilderComponent, IntroductionComponent, ActivityPageComponent, OverviewPageComponent, SvgPainterDirective, SvgPainterComponent, ColorPickerComponent, ActivityCaptionComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ActivityBuilderService]
})
export class ActivityBuilderModule { }
