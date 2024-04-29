import {Route} from '@angular/router'
import {CommentListComponent} from './components/comment-list/comment-list.component'

export const commentsRoutes: Route[] = [
  {
    path: '',
    component: CommentListComponent,
  },
]
