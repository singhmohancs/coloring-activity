import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActivityBuilderModule } from './activity-builder/activity-builder.module';
import { AppProvider } from './app.provider';
import { HttpClientModule } from '@angular/common/http';

export function appProviderFactory(provider: AppProvider) {
  return () => provider.resolveDependencies();
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ActivityBuilderModule,
    AppRoutingModule,
  ],
  providers: [AppProvider, { provide: APP_INITIALIZER, useFactory: appProviderFactory, deps: [AppProvider], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
