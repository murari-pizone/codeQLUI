import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
  @Input() loadingText : string = ''
  @Input() loadingTextColor : string = ''
  @Input() loadingCircleColor : string = ''
  @Input() from : string = ''
  @HostBinding('class.no-scroll') get disableScroll():boolean  {
    return this.isLoading;
  }
}
