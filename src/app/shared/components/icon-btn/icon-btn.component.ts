import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: ['./icon-btn.component.scss'],
  imports: [NgIf],
})
export class IconBtnComponent {
  @Input() btnClass: string = '';
  @Input() iconClass: string = '';
  @Input() text: string = '';

  @Output() clicked = new EventEmitter<boolean>();

  onClick(click: boolean): void {
    this.clicked.emit(click);
  }
}
