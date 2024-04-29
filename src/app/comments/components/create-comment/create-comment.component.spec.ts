import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CreateCommentComponent} from './create-comment.component'
import {FormsModule} from '@angular/forms'
import {createComponent} from '@angular/core'

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent
  let fixture: ComponentFixture<CreateCommentComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, CreateCommentComponent],
    })
    fixture = TestBed.createComponent(CreateCommentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
