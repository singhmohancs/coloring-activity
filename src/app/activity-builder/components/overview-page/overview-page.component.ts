import { Component, OnInit } from '@angular/core';
import { AppProvider } from 'src/app/app.provider';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  public activities:any;
  constructor(public appProvider: AppProvider) { }

  ngOnInit() {
    this.activities = this.appProvider.appConfig.coloringPages.pages;
    console.log(this.activities);
  }

}
