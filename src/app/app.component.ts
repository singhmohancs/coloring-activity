import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppProvider } from './app.provider';

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Virtual,
} from 'swiper/core';
import { Activity } from './models/activity.model';
import { ActivityBuilderService } from './activity-builder.service';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public appConfig: any;
  public activitiesSettings: any = {};
  public colors: any;
  public activityPages: any[] = [];
  public renderActivities: boolean = true;

  constructor(
    private appProvider: AppProvider,
    private activityService: ActivityBuilderService) {
    this.appConfig = this.appProvider.appConfig;
    this.colors = this.appConfig.coloringPages.colorOptions;
  }

  ngOnInit() {
    this.activitiesSettings = this.getActivitiesSettings();
    this.activityPages = this.appConfig.coloringPages.pages.map((p: Activity) => {
      return new Activity().deserialize(p);
    });
    this.setActivitiesSettings();

    this.activityService.reRenderActivity.subscribe(()=>{
      this.renderActivities = false;
      this.activitiesSettings = this.getActivitiesSettings();
      this.setActivitiesSettings();
      setTimeout(() => {
        this.renderActivities = true;
      })
    });

  }
  /**
   * getActivitiesSettings
   * @description read activities user settings from local storage
   *
   * @private
   * @returns
   * @memberof AppComponent
   */
  private getActivitiesSettings() {
    let activitiesSettings: any = localStorage.getItem('activities') || '';
    try {
      activitiesSettings = JSON.parse(activitiesSettings);
    } catch (error) {
      activitiesSettings = {};
    }
    return activitiesSettings;
  }
  /**
   * setActivitiesSettings
   * @description get user settings from localStorage settings and set to activity object to repaint the activty SVG element
   *
   * @private
   * @memberof AppComponent
   */
  private setActivitiesSettings() {
    this.activityPages.forEach((activity: Activity) => {
      if (activity.order && this.activitiesSettings[activity.order]) {
        activity.settings = this.activitiesSettings[activity.order];
      }
    });
  }

  onSlideChange(data: any) {
    this.getActivitiesSettings();
    this.activityService.onSlideChange.emit(data.activeIndex);
  }

}
