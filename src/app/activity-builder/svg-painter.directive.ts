import { Directive, ElementRef, EventEmitter, Input, Output, SimpleChange } from '@angular/core';

@Directive({ selector: '[svgPainter]' })
export class SvgPainterDirective {
  @Output() onSvgClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input('selectedColor') selectedColor?: any = '#ffffff';
  @Input('activity') activity?: any = {};
  @Input('svgPainter') svgPainter?: boolean;

  private element: ElementRef;
  private children: HTMLElement[] = [];
  constructor(el: ElementRef) {
    this.element = el;
  }

  ngOninit(): void {

  }

  ngOnChanges(changes: any) {
    console.log('changes detection', changes);
    //this.repaintSvg();
    if (changes.hasOwnProperty('svgPainter') && changes.svgPainter.currentValue) {
      this.svgClickHandler();
    }

    this.repaintSvg();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //@todo remove event listner.
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
    console.log('repaint');
    if (this.activity && Object.keys(this.activity).length) {
      for (const k in this.activity) {
        if (Object.prototype.hasOwnProperty.call(this.activity, k)) {
          const color = this.activity[k];
          const element: any = document.querySelector(`#${k}`);
          if (element) {
            element.style.fill = color;
          }
        }
      }
    }
  }

  private fillColor(el: HTMLElement, color: string) {
    el.style.fill = color;
  }
}
