import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent{
  @Input() message: any;
  @Input() type: any;
  constructor(public activeModal: NgbActiveModal) {}
  closeModal(): void{
    this.activeModal.close();
    window.location.reload();
  }

}
