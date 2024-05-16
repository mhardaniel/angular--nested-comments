import {CommonModule} from '@angular/common'
import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {TimeAgoPipe} from '../../../shared/pipes/time-ago.pipe'
import {ModalService} from '../../../shared/services/modal.service'
import {CommentInterface} from '../../types/comment.interface'
import {UserInterface} from '../../../shared/types/user.interface'
import {CreateCommentComponent} from '../create-comment/create-comment.component'
import {IconBtnComponent} from '../../../shared/components/icon-btn/icon-btn.component'
import {Store} from '@ngrx/store'
import {commentActions} from '../../store/comments.actions'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateCommentComponent,
    IconBtnComponent,
    TimeAgoPipe,
  ],
})
export class CommentComponent {
  @Input() comment!: CommentInterface
  @Input() currentUser!: UserInterface

  isReplying = false
  isEditing = false
  isHiddenReplies = false

  constructor(
    viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    private elementRef: ElementRef,
    private store: Store,
  ) {
    modalService.vcRef = viewContainerRef
  }

  onReply(): void {
    this.isReplying = !this.isReplying
  }
  onEdit(): void {
    this.isEditing = !this.isEditing
  }
  onDelete(deleteModalTemplate: TemplateRef<any>): void {
    this.modalService
      .open(deleteModalTemplate, {
        title: 'Delete Comment',
        cancelBtnTxt: 'no, cancel',
        confirmBtnTxt: 'yes, delete',
      })
      .subscribe((action) => {
        console.log('modalAction', action)
        this.isEditing = false
        this.elementRef.nativeElement.remove()

        if (this.comment.id)
          this.store.dispatch(commentActions.delete({id: this.comment.id}))
      })
  }

  onUpdate(comment: CommentInterface): void {
    try {
      this._update(comment)
      this.isEditing = false
    } catch (error) {
      this.isEditing = true
    }
  }

  onUpVote(): void {
    this.comment.score++
    this._update(this.comment)
  }
  onDownVote(): void {
    if (this.comment.score === 0) return
    this.comment.score--
    this._update(this.comment)
  }

  private _update(comment: CommentInterface) {
    try {
      this.store.dispatch(commentActions.update({request: comment}))
    } catch (error) {}
  }

  onReplySubmit(comment: CommentInterface): void {
    try {
      this.comment.replies?.unshift(comment)
      this.isReplying = false
    } catch (error) {}
  }

  identify(index: number, comment: CommentInterface) {
    return comment.id
  }
}
