import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inline-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './inline-error-msg.component.html',
  styleUrl: './inline-error-msg.component.scss'
})
export class InlineErrorMsgComponent {
  @Input() errorMsg : string = ''
  @Output() crossClick =  new EventEmitter<any>()
  constructor(){}
  closeEmit():void{
    this.crossClick.emit()
  }
  empty():void{
    console.log('empty')
  }

}
