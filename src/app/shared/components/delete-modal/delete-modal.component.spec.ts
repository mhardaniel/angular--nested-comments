import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {DeleteModalComponent} from './delete-modal.component'
import {click} from '../../testing/index'

describe('DeleteModalComponent', () => {
  let comp: DeleteModalComponent
  let fixture: ComponentFixture<DeleteModalComponent>
  let closeDe: DebugElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeleteModalComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent)
    comp = fixture.componentInstance
    closeDe = fixture.debugElement.query(By.css('.modal-btn-close'))

    spyOn(comp.closeEvent, 'emit')
    spyOn(comp.confirmEvent, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(comp).toBeTruthy()
  })

  it('should raise close event when clicked (triggerEventHandler)', () => {
    click(closeDe)
    expect(comp.closeEvent.emit).toHaveBeenCalledTimes(1)
  })

  it('should raise close event when clicked (element.click)', () => {
    let closeEl = closeDe.nativeElement

    click(closeEl)
    expect(comp.closeEvent.emit).toHaveBeenCalledTimes(1)
  })

  it('should raise confirm event when clicked (element.click)', () => {
    let confirmDe = fixture.debugElement.query(By.css('.modal-btn-confirm'))
    let confirmEl = confirmDe.nativeElement

    click(confirmEl)
    expect(comp.confirmEvent.emit).toHaveBeenCalledTimes(1)
  })

  it('should raise confirm event when clicked (comp.click)', () => {
    comp.confirm()
    expect(comp.confirmEvent.emit).toHaveBeenCalled()
  })
})
