import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() title? = 'Modal Title'
  @Input() cancelBtnTxt? = 'Cancel'
  @Input() confirmBtnTxt? = 'Confirm'
  @Output() closeEvent = new EventEmitter()
  @Output() confirmEvent = new EventEmitter()

  constructor(private elementRef: ElementRef) {}

  close(): void {
    this.elementRef.nativeElement.remove()
    this.closeEvent.emit()
  }

  confirm(): void {
    this.elementRef.nativeElement.remove()
    this.confirmEvent.emit()
  }
}
