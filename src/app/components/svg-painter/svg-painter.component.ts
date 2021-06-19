import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityBuilderService } from 'src/app/activity-builder.service';

@Component({
  selector: 'app-svg-painter',
  templateUrl: './svg-painter.component.html',
  styleUrls: ['./svg-painter.component.scss']
})
export class SvgPainterComponent implements OnInit {
  @Input() activity: any;
  @Input() selectedColor?: string;
  @Input() activityConfig?: string;
  @Input() svgPainter?:boolean;
  @Output() onSvgClicked: EventEmitter<any> = new EventEmitter<any>();

  public svgUrl: string = '';
  public isSvgLoaded: boolean = false;
  constructor(
    private activityBuilderService: ActivityBuilderService
  ) { }

  ngOnInit(): void {
    console.log(this.activityConfig);
  }

  ngOnChanges(changes: any){
    if (changes.hasOwnProperty('activity') && changes.activity.currentValue) {
      this.initializeSvg(this.activity);
    }
  }

  private initializeSvg(activity: any){
    this.svgUrl = `/assets/svg/Marie${this.activity.order}.svg`;
  }

  public onSVGInserted(data: any){
    this.activityBuilderService.bindSvgClick.emit();
    this.activityBuilderService.bindSvgRepaint.emit();
  }

  public svgClicked(data: any){
      this.onSvgClicked.emit(data);
  }

}