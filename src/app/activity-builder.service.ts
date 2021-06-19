import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityBuilderService {
  bindSvgClick = new EventEmitter();
  bindSvgRepaint = new EventEmitter();

  private activityData$ = new BehaviorSubject(null);
  activityData = this.activityData$.asObservable();



  constructor() { }
  /**
   * @name save
   * @description save activity data
   *
   * @returns void
   */
  save(activityData:any) {
    this.activityData$.next(activityData);
  }


}
