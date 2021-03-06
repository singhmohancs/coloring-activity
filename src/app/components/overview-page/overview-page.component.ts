import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityBuilderService } from 'src/app/activity-builder.service';
import { AppProvider } from 'src/app/app.provider';
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
  public summaryPageTitle: string = '';
  public summaryInstructions: string = '';
  public summaryYourStoryTitle: string = '';
  public importButtonLabel: string = '';
  public printButtonLabel: string = '';
  public saveButtonLabel: string = '';

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
    this.summaryPageTitle = this.appProvider.appConfig.summaryPageTitle;
    this.summaryInstructions = this.appProvider.appConfig.summaryInstructions;
    this.summaryYourStoryTitle = this.appProvider.appConfig.summaryYourStoryTitle;
    this.importButtonLabel = this.appProvider.appConfig.importButtonLabel;
    this.printButtonLabel = this.appProvider.appConfig.printButtonLabel;
    this.saveButtonLabel = this.appProvider.appConfig.saveButtonLabel;
  }

  /**
   * loadActivitySettings
   * load activity settings from localStorage
   *
   * @private
   * @memberof OverviewPageComponent
   */
  private loadActivitySettings() {
    this.activitiesConfig = this.activityService.loadActivitySettings();
  }

  /**
   * helper function
   * @return void
   */
   public goBack() {
    this.router.navigateByUrl(`activity-builder/activity/${this.activities.length}`);
  }

  downloadJson(){
    this.activityService.downloadJson();
  }

  printPage(){
    window.print();
  }

}
