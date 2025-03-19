import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success-edit',
  standalone: true,
  imports: [],
  templateUrl: './success-edit.component.html',
  styleUrl: './success-edit.component.scss'
})
export class SuccessEditComponent {
  @Output() normalState = new EventEmitter<any>();

  hideSuccess():void{
    this.normalState.emit()
  }
}
