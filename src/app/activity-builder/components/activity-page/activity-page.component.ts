import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { AppProvider } from 'src/app/app.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit {
  public appConfig: any;
  public selectedCaption: any[] = [];
  public selectedColor: string = '';
  private activityId: number = 1;
  private activities: any = {};
  public activity: any;
  private activityPageCount: number = 0;
  public colors;
  public captions: any[] = [];
  public svgUrl: any;
  public activityConfig:any = {};

  constructor(
    private appProvider: AppProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private sanitize: DomSanitizer) {
    this.appConfig = this.appProvider.appConfig;
    this.colors = this.appConfig.coloringPages.colorOptions;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.activityId = parseInt(params.id);
      this.loadActivity(this.activityId);
      this.reloadConfig();
      this.svgUrl = `/assets/svg/Marie${this.activityId}.svg`;
    });
    console.log(this.activity);
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
   * @name selectColor
   * @description a click handler to select and save selected color in selectedColor variable.
   *
   * @param color
   * @public
   * @return void
   */
  public selectColor(color: string) {
    this.selectedColor = color;
  }

  /**
   * @name dropHandler
   * @description a drop handler to capture the dropped caption and save it to selectedCaption variable
   * @param event
   *
   * @public
   * @return void
   */
  public dropHandler(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //empty caption list before adding new dropped item. List must store single item.
      // @todo refactor - list must have single item.
      event.container.data.length = 0;
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    if (!this.activities[this.activityId]) {
      this.activities[this.activityId] = {};
    }
    this.activities[this.activityId]['caption'] = this.selectedCaption;
    this.saveData(this.activities);
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
    const id:any = data.element.getAttribute('id');
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
   * helper function
   * @return void
   */
  public goBack() {
    if (this.activityId === 1) {
      this.router.navigateByUrl('/activity-builder');
      return;
    }
    this.router.navigateByUrl(`activity-builder/activity/${this.activityId - 1}`);

  }

  public goNext() {
    if (this.activityId === this.activityPageCount) {
      this.router.navigateByUrl('/activity-builder/overview');
      return;
    }
    this.router.navigateByUrl(`activity-builder/activity/${this.activityId + 1}`);
  }


}
