import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CommentComponent} from './comment.component'
import {HttpClientModule} from '@angular/common/http'
import {ModalService} from '../../../shared/services/modal.service'
import {CommentsService} from '../../services/comments.service'

describe('CommentComponent', () => {
  let component: CommentComponent
  let fixture: ComponentFixture<CommentComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [ModalService, CommentsService, CommentComponent],
    })
    fixture = TestBed.createComponent(CommentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
