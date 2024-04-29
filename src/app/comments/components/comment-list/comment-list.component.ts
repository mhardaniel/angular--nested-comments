import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {Component, OnInit} from '@angular/core'
import {CommentsService} from '../../services/comments.service'
import {ModalService} from '../../../shared/services/modal.service'
import {UserService} from '../../../shared/services/user.service'
import {CommentInterface} from '../../types/comment.interface'
import {UserInterface} from '../../../shared/types/user.interface'
import {CommentComponent} from '../comment/comment.component'
import {CreateCommentComponent} from '../create-comment/create-comment.component'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CommentComponent,
    CreateCommentComponent,
  ],
  providers: [CommentsService, UserService, ModalService],
})
export class CommentListComponent implements OnInit {
  comments: CommentInterface[] = []
  currentUser!: UserInterface

  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this._getCurrentUser()
    this._get()
  }

  private _getCurrentUser(): void {
    this.userService.get().subscribe((data) => {
      this.currentUser = data
    })
  }

  private _get(): void {
    this.commentsService.get().subscribe((data) => {
      this.comments = data
    })
  }

  onCreate(commentContent: string): void {
    try {
      let newComment: CommentInterface = {
        id: 0,
        content: commentContent,
        createdAt: new Date().toISOString(),
        score: 0,
        user: this.currentUser,
        replies: [],
      }

      this.commentsService.create(newComment).subscribe((comment) => {
        this.comments.unshift(comment)
      })
    } catch (error) {}
  }

  identify(index: number, comment: CommentInterface) {
    return comment.id
  }
}
