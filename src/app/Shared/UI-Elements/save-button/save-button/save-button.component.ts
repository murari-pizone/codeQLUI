import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonConstants } from '../const/button.constant';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [],
  providers : [ButtonConstants],
  templateUrl: './save-button.component.html',
})
export class SaveButtonComponent  {
  @Input() name : string = '' ;
  @Input() navigate : string = '' ;  
  constructor(readonly router : Router , readonly constant : ButtonConstants){}
  async  toNavigate(): Promise<void>{
    if(this.navigate && this.navigate == this.constant.syncMenu && this.navigate != ''){
      await  this.router.navigate(['/' + this.navigate])
    }
  }
}
