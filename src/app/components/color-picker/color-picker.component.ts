import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from '../../models/color.model';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() colors: Color[] = [{
    "order": 1,
    "name": "red",
    "color": "#FF0000"
  },
  {
    "order": 2,
    "name": "orange",
    "color": "#FFA500"
  },
  {
    "order": 3,
    "name": "yellow",
    "color": "#FFFF00"
  }];
  public selectedColor: Color | undefined;
  constructor() {
  }

  ngOnInit() {
  }

  /**
 * @name selectColor
 * @description a click handler to select and save selected color in selectedColor variable.
 *
 * @param color
 * @public
 * @return void
 */
  public selectColor(color: Color) {
    this.selectedColor = color;
    if (this.onSelect) this.onSelect.emit(color);
  }

}
