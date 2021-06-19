import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppProvider } from 'src/app/app.provider';
import { Color } from '../color-picker/color.model';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Virtual,
 
} from 'swiper/core';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss'],
})
export class ActivityPageComponent implements OnInit {
  @ViewChild("swiperRef", { static: false }) sliderRef?: SwiperComponent;

  public appConfig: any;
  public selectedCaption: any;
  public selectedColor: string | undefined;
  private activityId: number = 1;
  public activities: any = {};
  public activity: any;
  public activityPageCount: number = 0;
  public currentPage: number = 1;
  public colors;
  public captions: any[] = [];
  public svgUrl: any;
  public activityConfig: any = {};
  public activityPages: any[] = [];
  public navigation: any = {};
  public pagination: any = {};

  constructor(
    private appProvider: AppProvider) {
    this.appConfig = this.appProvider.appConfig;
    this.colors = this.appConfig.coloringPages.colorOptions;
  }

  ngOnInit() {
    this.navigation = {
      showNavigation: false,
      nextEl: '.button-next',
      prevEl: '.button-prev',
    };
    this.activityPages = this.appConfig.coloringPages.pages;
    this.selectedCaption = {};

    this.activityId = parseInt('1');
    this.loadActivity(this.activityId);
    this.reloadConfig();
    this.svgUrl = `/assets/svg/Marie${this.activityId}.svg`;

  }

  private reloadConfig() {
    let activities: any = localStorage.getItem('activities') || '';
    try {
      activities = JSON.parse(activities);
    } catch (error) {
      activities = {};
    }
    this.activities = activities;
    const activity = activities[this.activityId];
    if (activity && activity['caption']) {
      this.selectedCaption = activity['caption'];
      delete activity.caption;
    }
    this.activityConfig = activity;
  }

  private loadActivity(id: any) {
    const pages = this.appConfig.coloringPages.pages;
    const activity = pages.find((a: any) => {
      return a.order == this.activityId;
    });
    this.activityPageCount = pages.length;
    this.captions = activity.captionOptins;
    this.activity = activity;

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
    this.selectedColor = colorObj.color;
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
    const id: any = data.element.getAttribute('id');
    if (!this.activities[this.activityId]) {
      this.activities[this.activityId] = {};
    }
    this.activities[this.activityId][id] = data.color;
    this.saveData(this.activities);
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
    this.selectedCaption = caption;
    if (!this.activities[this.activityId]) {
      this.activities[this.activityId] = {};
    }
    this.activities[this.activityId]['caption'] = this.selectedCaption;
    this.saveData(this.activities);
  }

  public gotoReview() {
    //this.router.navigateByUrl('/activity-builder/overview');
  }

  onSlideChange(data: any){
    this.currentPage = data.activeIndex+1
  }

  changeSlide(dir: any){
    if(this.sliderRef){
      if(dir === 'next'){
        this.sliderRef.swiperRef.slideNext()
      }

      if(dir === 'prev'){
        this.sliderRef.swiperRef.slidePrev()
      }

    }

  }


}
