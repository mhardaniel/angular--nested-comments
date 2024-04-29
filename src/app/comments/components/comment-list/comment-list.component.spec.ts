import {ComponentFixture, TestBed} from '@angular/core/testing'

import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {CommentListComponent} from './comment-list.component'
import {CreateCommentComponent} from '../create-comment/create-comment.component'
import {UserService} from '../../../shared/services/user.service'
import {CommentsService} from '../../services/comments.service'

describe('CommentListComponent', () => {
  let component: CommentListComponent
  let fixture: ComponentFixture<CommentListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        CommentListComponent,
        CreateCommentComponent,
      ],
      declarations: [],
      providers: [CommentsService, UserService],
    })
    fixture = TestBed.createComponent(CommentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
