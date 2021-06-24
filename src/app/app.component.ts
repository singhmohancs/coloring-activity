import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppProvider } from './app.provider';
import { Color } from './models/color.model';

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
  public selectedCaption: any;
  public selectedColor: string | undefined;
  public activityId: number = 1;
  public activitiesSettings: any = {};
  public activity: any;
  public activityPageCount: number = 0;
  public colors: any;
  public captions: any[] = [];
  public activityConfig: any = {};
  public activityPages: any[] = [];
  public currentAcitity: Activity | Object = {};
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
  /**
   * @name onColorSelect
   * @description a click handler to select and save selected color in selectedColor variable.
   *
   * @param color
   * @public
   * @return void
   */
  public onColorSelect(colorObj: Color) {
    this.selectedColor = colorObj ? colorObj.color : '';
  }

  /**
   * @name onSvgClicked
   * @description SVG element click handler.
   * Apply selected color on targeted element
   * save selectedColor and cssClass of targeted element
   *
   * @param {{ element: HTMLElement, color: string }} data
   * @memberof ActivityPageComponent
   * @return void
   *
   */
  public onSvgClicked(data: { element: HTMLElement, color: string }) {
    if (!data.color) return;
    const cssClas = this.getUniqueClass(data.element.getAttribute('class'));
    if (!this.activitiesSettings[this.activityId]) {
      this.activitiesSettings[this.activityId] = {};
    }
    this.activitiesSettings[this.activityId][cssClas] = data.color.trim();
    this.saveData(this.activitiesSettings);
  }

  private getUniqueClass(cssClass: string | null): string {
    if (!cssClass) return '';
    let string_tokens = cssClass.split(' ');
    string_tokens = string_tokens.filter(token => {
      return token.startsWith('file-');
    });

    if (string_tokens.length > 0) {
      return string_tokens[0];
    }
    return '';
  }
  /**
   * @name saveData
   * @description save activity data to localstorage
   * @param data
   *
   * @return void
   */
  private saveData(data: any) {
    var activities = JSON.stringify(data);
    localStorage.setItem('activities', activities);
  }
  /**
   * onCaptionSelect
   * @description select caption and store in selectedCaption
   *
   * @param {*} caption
   * @memberof ActivityPageComponent
   *
   * @return void
   */
  public onCaptionSelect(caption: any) {
    if (!caption) return;
    this.selectedCaption = caption;
    if (!this.activitiesSettings[this.activityId]) {
      this.activitiesSettings[this.activityId] = {};
    }
    this.activitiesSettings[this.activityId]['caption'] = this.selectedCaption;

    this.saveData(this.activitiesSettings);
  }

  onSlideChange(data: any) {
    const activity = this.activityPages[data.activeIndex - 1];
    if (activity) {
      this.currentAcitity = activity;
      this.captions = activity.captionOptins;
      this.activityId = activity.order;
      if (this.activitiesSettings[this.activityId]) {
        this.selectedCaption = this.activitiesSettings[this.activityId].caption;
      }
    } else {
      this.selectedCaption = null;
    }
    this.activityService.onSlideChange.emit(data.activeIndex);
  }

  getCaption(){
    return this.activitiesSettings[this.activityId]? this.activitiesSettings[this.activityId].caption : null;
  }

  downloadJson(){
    this.activityService.downloadJson();
  }


}
