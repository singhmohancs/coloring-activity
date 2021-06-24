import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityBuilderService } from 'src/app/activity-builder.service';
import { AppProvider } from 'src/app/app.provider';
import { saveAs } from 'file-saver';
// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Virtual,
} from 'swiper/core';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewPageComponent implements OnInit {
  public activitiesConfig:any;
  public activities:any;
  constructor(
    private appProvider: AppProvider,
    private router: Router,
    private activityService: ActivityBuilderService
    ) { }

  ngOnInit() {
    this.activities = this.appProvider.appConfig.coloringPages.pages;
    this.activityService.onSlideChange.subscribe((index: number) => {
      if(index === this.activities.length+1){
        this.loadActivitySettings();
      }
    })
    this.loadActivitySettings();
  }

  /**
   * loadActivitySettings
   * load activity settings from localStorage
   *
   * @private
   * @memberof OverviewPageComponent
   */
  private loadActivitySettings() {
    let activitiesConfig: any = localStorage.getItem('activities') || '';
    try {
      activitiesConfig = JSON.parse(activitiesConfig);
    } catch (error) {
      activitiesConfig = {};
    }
    this.activitiesConfig = activitiesConfig;
  }

  /**
   * helper function
   * @return void
   */
   public goBack() {
    this.router.navigateByUrl(`activity-builder/activity/${this.activities.length}`);
  }

  downloadJson(){
    let json:any = {
      data : this.activitiesConfig,
      appId: this.appProvider.appConfig.appId
    };
    json = JSON.stringify(json);
    const blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${this.appProvider.appConfig.appName}.cb`);
  }

  printPage(){
    window.print();
  }

}
