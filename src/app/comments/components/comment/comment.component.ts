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
import {CommentsService} from '../../services/comments.service'
import {ModalService} from '../../../shared/services/modal.service'
import {CommentInterface} from '../../types/comment.interface'
import {UserInterface} from '../../../shared/types/user.interface'
import {CreateCommentComponent} from '../create-comment/create-comment.component'
import {IconBtnComponent} from '../../../shared/components/icon-btn/icon-btn.component'

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
    private commentsService: CommentsService,
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

        this.commentsService.delete(this.comment.id)
      })
  }

  onUpdate(): void {
    try {
      this._update()
      this.isEditing = false
    } catch (error) {
      this.isEditing = true
    }
  }

  onUpVote(): void {
    this.comment.score++
    this._update()
  }
  onDownVote(): void {
    if (this.comment.score === 0) return
    this.comment.score--
    this._update()
  }

  private _update() {
    try {
      this.commentsService.update(this.comment)
    } catch (error) {}
  }

  onReplySubmit(commentContent: string): void {
    try {
      let replyComment: CommentInterface = {
        id: 0,
        content: commentContent,
        createdAt: new Date().toISOString(),
        score: 0,
        user: this.currentUser,
        replyingTo: this.comment.user.username,
      }

      this.comment.replies?.unshift(replyComment)
      this.isReplying = false
    } catch (error) {}
  }

  identify(index: number, comment: CommentInterface) {
    return comment.id
  }
}
