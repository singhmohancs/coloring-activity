import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppProvider } from './app.provider';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';


import { IntroductionComponent } from './components/introduction/introduction.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { SvgPainterDirective } from './directives/svg-painter.directive';
import { FileUploaderDirective } from './directives/file-uploader.directive';
import { SvgPainterComponent } from './components/svg-painter/svg-painter.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ActivityCaptionComponent } from './components/activity-caption/activity-caption.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActivityBuilderService } from './activity-builder.service';
import { AppShellComponent } from './shell.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityComponent } from './components/activity/activity.component';



export function appProviderFactory(provider: AppProvider) {
  return () => provider.resolveDependencies();
}

@NgModule({
  declarations: [
    AppShellComponent,
    AppComponent,
    PageNotFoundComponent,
    IntroductionComponent,
    OverviewPageComponent,
    SvgPainterDirective,
    FileUploaderDirective,
    SvgPainterComponent,
    ColorPickerComponent,
    ActivityCaptionComponent,
    ActivityComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    SwiperModule,
    NgbModule,
    AppRoutingModule,

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AppProvider,
    ActivityBuilderService, { provide: APP_INITIALIZER, useFactory: appProviderFactory, deps: [AppProvider], multi: true }],
  bootstrap: [AppShellComponent],
})
export class AppModule { }
