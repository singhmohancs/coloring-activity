import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../app.provider';

@Component({
  selector: 'app-activity-print',
  templateUrl: './activity-print.component.html',
  styleUrls: ['./activity-print.component.scss']
})
export class ActivityPrintComponent implements OnInit {

  public activitiesConfig:any;
  public activities:any;
  constructor(
    private appProvider: AppProvider
    ) { }

  ngOnInit() {
    this.activities = this.appProvider.appConfig.coloringPages.pages;
    this.loadActivitySettings();
  }

  /**
   * loadActivitySettings
   * load activity settings from localStorage
   *
   * @private
   * @memberof OverviewPageComponent
   */
  private loadActivitySettings() {
    let activitiesConfig: any = localStorage.getItem('activities') || '';
    try {
      activitiesConfig = JSON.parse(activitiesConfig);
    } catch (error) {
      activitiesConfig = {};
    }
    this.activitiesConfig = activitiesConfig;
  }

}
