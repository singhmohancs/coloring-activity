import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewEncapsulation } from '@angular/core';
import { Caption } from './caption.model';

@Component({
  selector: 'app-activity-caption',
  templateUrl: './activity-caption.component.html',
  styleUrls: ['./activity-caption.component.scss']
})
export class ActivityCaptionComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoad: EventEmitter<any> = new EventEmitter<any>();
  @Input() captions: Caption[] = [{
    "order": 1,
    "captionLabel": "Build in your soul on interior solitude that you can keen everywhere. There, live in God."
  },
  {
    "order": 2,
    "captionLabel": "God expects great things from you if you let him handle your."
  }];
  public selectedCaption: Caption|null;

  constructor() {
    this.selectedCaption = null
  }

  ngOnInit() {
    if (this.onLoad) this.onLoad.emit(this.selectedCaption);
  }

  /**
 * @name selectCaption
 * @description a click handler to select and save selected caption in selectedCaption variable.
 *
 * @param caption
 * @public
 * @return void
 */
  public selectCaption(caption: Caption) {
    this.selectedCaption = caption;
    if (this.onSelect) this.onSelect.emit(caption);
  }

}
