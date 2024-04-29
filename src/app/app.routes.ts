import {Route} from '@angular/router'
import {CommentListComponent} from './comments/components/comment-list/comment-list.component'

export const appRoutes: Route[] = [
  {
    path: '',
    component: CommentListComponent,
  },
]
