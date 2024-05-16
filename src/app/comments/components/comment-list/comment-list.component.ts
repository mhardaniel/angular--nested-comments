import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {CommentInterface} from '../../types/comment.interface'
import {CommentComponent} from '../comment/comment.component'
import {CreateCommentComponent} from '../create-comment/create-comment.component'
import {Store} from '@ngrx/store'
import {commentActions} from '../../store/comments.actions'
import {combineLatest} from 'rxjs'
import {commentFeature} from '../../store/comments.reducers'
import {userFeature} from 'src/app/shared/store/users/users.reducers'
import {userActions} from 'src/app/shared/store/users/users.actions'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CommentComponent, CreateCommentComponent],
})
export class CommentListComponent implements OnInit {
  data$ = combineLatest({
    comments: this.store.select(commentFeature.selectComments),
    currentUser: this.store.select(userFeature.selectCurrentUser),
  })

  constructor(private store: Store) {
    //
  }

  ngOnInit(): void {
    this.store.dispatch(userActions.currentUser())
    this.store.dispatch(commentActions.load())
  }

  onCreate(comment: CommentInterface): void {
    try {
      this.store.dispatch(commentActions.create({request: comment}))
    } catch (error) {}
  }

  identify(index: number, comment: CommentInterface) {
    return comment.id
  }
}
