import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppProvider } from 'src/app/app.provider';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  public activitiesConfig:any;
  public activities:any;
  constructor(
    private appProvider: AppProvider,
    private router: Router
    ) { }

  ngOnInit() {
    this.activities = this.appProvider.appConfig.coloringPages.pages;
    console.log(this.activities);
    let activitiesConfig: any = localStorage.getItem('activities') || '';
    try {
      activitiesConfig = JSON.parse(activitiesConfig);
    } catch (error) {
      activitiesConfig = {};
    }
    this.activitiesConfig = activitiesConfig;

    console.log(this.activitiesConfig);
  }

  /**
   * helper function
   * @return void
   */
   public goBack() {
    this.router.navigateByUrl(`activity-builder/activity/${this.activities.length}`);
  }

}
