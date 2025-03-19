import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modifiers-tab-basic-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modifiers-tab-basic-info.component.html',
  styleUrl: './modifiers-tab-basic-info.component.scss'
})
export class ModifiersTabBasicInfoComponent {
  isChevronUp:boolean= false;

  empty():void{
    console.log('empty')
  }
}
