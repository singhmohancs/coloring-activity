import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({ selector: '[svgPainter]' })
export class SvgPainterDirective {
  @Output() onSvgClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input('selectedColor') selectedColor?: any = '#ffffff';
  @Input('activity') activity?: any = {};

  private element: ElementRef;
  private children: HTMLElement[] = [];
  constructor(el: ElementRef) {
    this.element = el;
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.children = this.element.nativeElement.querySelectorAll('path, circle, ellipse, polyline, line, rect, polygon');

    this.children.forEach((child: HTMLElement) => {
      child.addEventListener('click', () => {
        this.fillColor(child, this.selectedColor);
        if (this.onSvgClicked) {
          this.onSvgClicked.emit({ element: child, color: this.selectedColor });
        }
      })
    });

    if(this.activity && Object.keys(this.activity).length){
      for (const k in this.activity) {
        if (Object.prototype.hasOwnProperty.call(this.activity, k)) {
          const element = this.activity[k];
          console.log(k, element);
          const e: any = document.querySelector(`.${k}`);
          e.style.fill = element;
        }
      }
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //@todo remove event listner.
  }

  private fillColor(el: HTMLElement, color: string) {
    el.style.fill = color;
  }
}
