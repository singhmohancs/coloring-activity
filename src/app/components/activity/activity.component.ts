import { Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { ActivityBuilderService } from 'src/app/activity-builder.service';
import { AppProvider } from 'src/app/app.provider';
import { Activity, ActivitySettings } from 'src/app/models/activity.model';
import { Color } from 'src/app/models/color.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() currentIndex: number = 1;
  @Input()
  activity!: Activity;
  @Input()
  colors!: Color[];
  @Input() activitiesSettings: any

  public selectedColor!: string;
  public selectedCaption!: any;
  public activityId: any;
  public captions: any[] = [];
  public saveButtonLabel: string = '';

  constructor(
    private activityService: ActivityBuilderService,
    private appProvider: AppProvider,
  ) { }

  ngOnInit() {
    this.activityId = this.activity ? this.activity.order : '';
    this.activityService.onSlideChange.pipe(distinctUntilChanged()).subscribe(() => {
      if (this.activity) {
        this.captions = this.activity.captionOptions;
        this.activityId = this.activity.order;
        this.selectedCaption = this.activity.settings?.caption;
      }
      this.selectedColor = '';
    });

    this.saveButtonLabel = this.appProvider.appConfig.saveButtonLabel;
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

  getCaption() {
    return this.activitiesSettings[this.activityId] ? this.activitiesSettings[this.activityId].caption : null;
  }

  downloadJson() {
    this.activityService.downloadJson();
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

}
