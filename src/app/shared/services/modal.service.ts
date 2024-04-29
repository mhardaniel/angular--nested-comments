import {DOCUMENT} from '@angular/common'
import {
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'
import {Subject} from 'rxjs'
import {DeleteModalComponent} from '../components/delete-modal/delete-modal.component'

@Injectable()
export class ModalService {
  private modalNotifier?: Subject<string>
  vcRef!: ViewContainerRef

  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  open(
    content: TemplateRef<any>,
    options?: {cancelBtnTxt?: string; title?: string; confirmBtnTxt?: string},
  ) {
    const contentViewRef = content.createEmbeddedView(
      content.elementRef.nativeElement,
    )
    let injectorOptions = {
      injector: this.injector,
      projectableNodes: [contentViewRef.rootNodes],
    }
    const modalComponent = this.vcRef.createComponent(
      DeleteModalComponent,
      injectorOptions,
    )

    modalComponent.instance.title = options?.title
    modalComponent.instance.cancelBtnTxt = options?.cancelBtnTxt
    modalComponent.instance.confirmBtnTxt = options?.confirmBtnTxt
    modalComponent.instance.closeEvent.subscribe(() => this._closeModal())
    modalComponent.instance.confirmEvent.subscribe(() => this._confirmModal())

    modalComponent.hostView.detectChanges()

    this.document.body.appendChild(modalComponent.location.nativeElement)
    this.modalNotifier = new Subject()
    return this.modalNotifier?.asObservable()
  }

  private _closeModal() {
    this.modalNotifier?.complete()
  }

  private _confirmModal() {
    this.modalNotifier?.next('confirm')
    this._closeModal()
  }
}
