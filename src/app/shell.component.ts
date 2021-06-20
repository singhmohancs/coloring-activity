import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shell',
  encapsulation: ViewEncapsulation.None,
  template:`<router-outlet></router-outlet>`

})
export class AppShellComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
