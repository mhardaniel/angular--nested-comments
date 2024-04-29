import {CommonModule} from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {CommentInterface} from '../../types/comment.interface'
import {UserInterface} from '../../../shared/types/user.interface'

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CreateCommentComponent implements OnChanges {
  @Input() add? = false
  @Input() edit? = false
  @Input() reply? = false
  @Input() comment?: CommentInterface
  @Input() currentUser!: UserInterface
  @Output() submitEvent = new EventEmitter<string>()

  @ViewChild('createTextArea') set createTextAreaRef(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus()
    }
  }

  commentContent = ''

  ngOnChanges(changes: SimpleChanges) {
    this.commentContent =
      'edit' in changes && this.comment ? this.comment.content : ''
  }

  submit(): void {
    if (this.edit && this.comment) this.comment.content = this.commentContent
    this.submitEvent.emit(this.commentContent)
    if (this.add) this.commentContent = ''
  }
}
