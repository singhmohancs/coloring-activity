import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AppConfig {
  appName: string;
  introPageTitle: string;
  introPageInstructions: string;
  coloringPages: {
    colorOptions: { order: number, name: string, color: string }[];
    pages: { order: number, svg: string, captionOptins: { order: number, captionLabel: string }[] }[]
  };
  summaryPageTitle: string;
  SummaryInstructions: string;
}

@Injectable()
export class AppProvider {

  public appConfig: any;
  constructor(private injector: Injector) {}
  resolveDependencies() {
    return new Promise((resolve, reject) => {
      const http = this.injector.get(HttpClient);
      http.get<any>(`/assets/data/app-config.json`).subscribe((response: any) => {
        this.appConfig = response;
        resolve(response);
      });
    });
  }
}
