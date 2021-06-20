import { Component, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges } from '@angular/core';
import { Caption } from '../../models/caption.model';

@Component({
  selector: 'app-activity-caption',
  templateUrl: './activity-caption.component.html',
  styleUrls: ['./activity-caption.component.scss']
})
export class ActivityCaptionComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() caption: Caption | undefined;
  @Input() captions: Caption[] = [{
    "order": 1,
    "captionLabel": "Build in your soul on interior solitude that you can keen everywhere. There, live in God."
  },
  {
    "order": 2,
    "captionLabel": "God expects great things from you if you let him handle your."
  }];
  public selectedCaption: Caption | undefined;
  constructor(
    private zone: NgZone
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('caption')){
      if(changes['caption'].currentValue != changes['caption'].previousValue){
        this.selectedCaption = this.caption;

      }
    }
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
    this.zone.run(() => {
      this.selectedCaption = caption;
    });
    if (this.onSelect) this.onSelect.emit(caption);
  }

}
