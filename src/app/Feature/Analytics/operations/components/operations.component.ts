import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InlineErrorMsgComponent } from '../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../Core/services/common.service';
import { FilterComponent } from '../../../../Shared/filter/filter.component';
import { OperationsTab } from '../interface/operations.interface';
import { OperationsConstant } from '../const/operations.const';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, InlineErrorMsgComponent, FilterComponent],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
  providers:[OperationsConstant]
})
export class OperationsComponent {
  errorMsg: string = ''
  isErrorOccur: boolean = false;

  currentTabIndex: number = 0;
  visibleTabs: number = 4;
  currentStep: string = 'Order Completion Time';


  tabs: OperationsTab[];
  constructor(public constant: OperationsConstant) {
    this.tabs = this.constant.OperationsTabs;
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  // filter code 
  filter(value: string): void {
    console.log(value)
  }

  // Show previous tab
  showPreviousTab(): void {
    this.currentTabIndex = Math.max(0, this.currentTabIndex - this.visibleTabs);
  }

  empty(): void {
    console.log('empty');
  }

  // Show next tab
  showNextTab(): void {
    const maxIndex = Math.max(0, this.tabs.length - this.visibleTabs);
    this.currentTabIndex = Math.min(this.currentTabIndex + this.visibleTabs, maxIndex);
  }

}
