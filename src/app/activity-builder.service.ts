import { EventEmitter, Injectable } from '@angular/core';
import { AppProvider } from './app.provider';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ActivityBuilderService {
  bindSvgClick = new EventEmitter();
  bindSvgRepaint = new EventEmitter();
  onSlideChange = new EventEmitter();
  reRenderActivity = new EventEmitter();
  constructor(
    private appProvider: AppProvider,
  ) { }

  loadActivitySettings() {
    let activitiesConfig: any = localStorage.getItem('activities') || '';
    try {
      activitiesConfig = JSON.parse(activitiesConfig);
    } catch (error) {
      activitiesConfig = {};
    }
    return activitiesConfig;
  }

  downloadJson(){
    const activitiesConfig = this.loadActivitySettings();
    let json:any = {
      data : activitiesConfig,
      appId: this.appProvider.appConfig.appId
    };
    json = JSON.stringify(json);
    const blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${this.appProvider.appConfig.appName}.cb`);
  }
}
