import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityBuilderService } from 'src/app/activity-builder.service';
import { AppProvider } from 'src/app/app.provider';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  constructor(
    private appProvider: AppProvider,
    private modalService: NgbModal,
    private activityService: ActivityBuilderService
  ) { }

  /**
   * onFileUpload
   * process file content
   *
   * @param file
   */
  onFileUpload(file: any) {
    if (!file) return;
    let message;
    let type;
    if (file.appId) {
      if (this.appProvider.appConfig.appId == file.appId) {
        if (file.data) {
          localStorage.setItem('activities', JSON.stringify(file.data));
          message = "You've successfully imported your coloring book!";
          type = 'success';
        } else {
          message = "This coloring book file is not valid for importing.";
          type = 'error';
        }
      } else {
        message = "This coloring book file is not valid for importing.";
        type = 'error';
      }
    } else {
      message = "This coloring book file is not valid for importing.";
      type = 'error';
    }
    const modalRef = this.modalService.open(MessageModalComponent, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
    modalRef.result.then(() => {
      this.activityService.reRenderActivity.emit();
    })
  }
}
