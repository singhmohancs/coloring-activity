import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit {

  public selectedCaption: string[] = [];
  public selectedColor: string = '';
  private activityId: string = 'page_1';
  private activities: any = {};
  public activity: any = {};

  public colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#A020F0', '#000000', '#CCCCCC', '#808080', '#CC8B34', '#FFC0CB', '#ffe39f', '#A52A2A', '#DBBFF6', '#9ACD32', '#0D98BA'];
  public captions = [
    'Build in your soul on interior solitude that you can keen everywhere. There, live in God.',
    'God expects great things from you if you let him handle your.',
    'God has his hour and he\'ll enable you to accomplish what he has determined for you from all eternity.',
    'How good is to reply only on the Providence of such a good.',
    'Jesus knows what he wants to do with us, let us be glad to let Him do it.',
    'I am surprised that knowing that God is our Father, we aren\'t always happy.'
  ];

  constructor() { }

  ngOnInit() {
    let activities: any = localStorage.getItem('activities') || '';
    try {
      activities = JSON.parse(activities);
    } catch (error) {
      activities = [];
    }
    this.activities = activities;
    const activity = activities[this.activityId];
    if (activity && activity['caption']) {
      this.selectedCaption = activity['caption'];
      delete activity.caption;
    }
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
    const cssClass: any = data.element.className;
    if (!this.activities[this.activityId]) {
      this.activities[this.activityId] = {};
    }
    this.activities[this.activityId][cssClass.baseVal] = data.color;
    this.saveData(this.activities);
  }

  private saveData(data: any) {
    var activities = JSON.stringify(data);
    localStorage.setItem('activities', activities);
  }


}
