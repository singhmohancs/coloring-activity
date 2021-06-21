import { Directive, ElementRef, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivityBuilderService } from '../activity-builder.service';


@Directive({ selector: '[svgPainter]' })
export class SvgPainterDirective {
  @Output() onSvgClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input('selectedColor') selectedColor?: any = '#ffffff';
  @Input('activity') activitySetting?: any = {};
  @Input('svgPainter') svgPainter?: boolean;

  private element: ElementRef;
  private children: HTMLElement[] = [];
  constructor(
    el: ElementRef,
    public activityBuilderService: ActivityBuilderService
  ) {
    this.element = el;
  }

  ngOnInit(): void {
    this.activityBuilderService.bindSvgClick.subscribe(data => {
      this.svgClickHandler();
    });

    this.activityBuilderService.bindSvgRepaint.subscribe(data => {
      this.repaintSvg();
    });
  }

ngOnChanges(changes: SimpleChanges){
  if(changes.hasOwnProperty('activitySetting')){
    if(changes['activitySetting'].currentValue != changes['activitySetting'].previousValue){
      this.repaintSvg();
    }
  }
}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  /**
   * svgClickHandler
   * bind click event on svg's elements.
   *
   * @private
   * @memberof SvgPainterDirective
   */
  private svgClickHandler(): void {
    this.children = this.element.nativeElement.querySelectorAll('path, circle, ellipse, polyline, line, rect, polygon');
    this.children.forEach((child: HTMLElement) => {
      child.addEventListener('click', () => {
        this.fillColor(child, this.selectedColor);
        if (this.onSvgClicked) {
          this.onSvgClicked.emit({ element: child, color: this.selectedColor });
        }
      })
    });
  }

  private repaintSvg() {
    if (this.activitySetting && Object.keys(this.activitySetting).length) {
      for (const k in this.activitySetting) {
        if (Object.prototype.hasOwnProperty.call(this.activitySetting, k)) {
          if (k) {
            const color = this.activitySetting[k];
            const elements: any = document.querySelectorAll(`.${k}`);
            elements.forEach((e: HTMLElement) => {
              if (e) {
                e.style.fill = color;
              }
            })
          }


        }
      }
    }
  }

  private fillColor(el: HTMLElement, color: string) {
    el.style.fill = color;
  }
}
