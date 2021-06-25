import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[fileUploader]' })
export class FileUploaderDirective {
  @Output() onUpload: EventEmitter<any> = new EventEmitter<any>();
  @Input('fileUploader') fileUploader?: boolean;
  private element: ElementRef;
  constructor(
    el: ElementRef
  ) {
    this.element = el;
  }

  ngOnInit(): void {
  }

  @HostListener('change') onChangeFile() {
    if (this.element.nativeElement.value) {
      this.fileOnChangeHandler(this.element.nativeElement);
    }
    this.element.nativeElement.value = null;
  }
  /**
   * fileOnChangeHandler
   * an helper function to handle file processing
   * @param {*} value
   * @memberof FileUploaderDirective
   */
  fileOnChangeHandler(nativeElement: any) {
    if (nativeElement.files.length > 0) {
      const reader: any = new FileReader(); // File reader to read the file
      // This event listener will happen when the reader has read the file
      reader.addEventListener('load', () => {
        const result = JSON.parse(reader.result); // Parse the result into an object
        if (this.onUpload) {
          this.onUpload.emit(result);
        }
      });
      reader.readAsText(nativeElement.files[0]); // Read the uploaded file
    }
  }




}
