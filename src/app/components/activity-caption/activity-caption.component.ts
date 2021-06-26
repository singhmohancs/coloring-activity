import { Component, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Caption } from '../../models/caption.model';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

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
  public selectedCaption!: Caption | undefined;
  public captionField: FormControl;
  constructor(
    private zone: NgZone
  ) {
    let customCaptionValue = this.selectedCaption && this.selectedCaption.custom ? this.selectedCaption.captionLabel : ''
    this.captionField = new FormControl(customCaptionValue);
  }

  ngOnInit() {
    this.captionField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(text => {
      if(text.trim().length == 0) return;
      this.selectedCaption = {
        captionLabel: text,
        custom: true,
      };
      this.selectCaption(this.selectedCaption);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('caption')) {
      if (changes['caption'].currentValue != changes['caption'].previousValue) {
        this.selectedCaption = this.caption;
        let customCaptionValue = this.selectedCaption && this.selectedCaption.custom ? this.selectedCaption.captionLabel : ''
        this.captionField.setValue(customCaptionValue);
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
    if(!caption.custom && this.captionField.value){
        this.captionField.setValue('');
    }
    this.zone.run(() => {
      this.selectedCaption = caption;
    });
    if (this.onSelect) this.onSelect.emit(caption);
  }

}
