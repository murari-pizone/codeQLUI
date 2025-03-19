import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  templateUrl: './model.component.html',
})
export class ModelComponent {
@ViewChild('globalModel', { static: false }) modalElement!: ElementRef;
 @Input() title : string = '';
 @Input() context : string = '';
 @Output() clickToSure = new EventEmitter<any>();
 modalVisible : boolean = false;
 clickToSureEmit():void{
  this.clickToSure.emit()
 }
}
