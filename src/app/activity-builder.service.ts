import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityBuilderService {
  bindSvgClick = new EventEmitter();
  bindSvgRepaint = new EventEmitter();
  onSlideChange = new EventEmitter();
  reRenderActivity = new EventEmitter();
  constructor() { }
}
