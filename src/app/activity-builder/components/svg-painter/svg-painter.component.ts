import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

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
  constructor() { }

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
    setTimeout(() =>{
      this.isSvgLoaded = true;
      console.log('hdkjhsadk akshd ksdjasjdlasl djljsd');
    }, 100);
  }

  public svgClicked(data: any){
      this.onSvgClicked.emit(data);
  }

}
