import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppProvider } from './app.provider';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';


import { IntroductionComponent } from './components/introduction/introduction.component';
import { ActivityPageComponent } from './components/activity-page/activity-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { SvgPainterDirective } from './svg-painter.directive';
import { SvgPainterComponent } from './components/svg-painter/svg-painter.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ActivityCaptionComponent } from './components/activity-caption/activity-caption.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActivityBuilderService } from './activity-builder.service';



export function appProviderFactory(provider: AppProvider) {
  return () => provider.resolveDependencies();
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    IntroductionComponent,
    ActivityPageComponent,
    OverviewPageComponent,
    SvgPainterDirective,
    SvgPainterComponent,
    ColorPickerComponent,
    ActivityCaptionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    SwiperModule,
    RouterModule.forRoot([])
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AppProvider,
    ActivityBuilderService, { provide: APP_INITIALIZER, useFactory: appProviderFactory, deps: [AppProvider], multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
