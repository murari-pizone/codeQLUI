import { Component } from '@angular/core';
import { InlineErrorMsgComponent } from '../../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../../Core/services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [InlineErrorMsgComponent, CommonModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {

  isErrorOccur: boolean = false;
  errorMsg: string = '';
  currentTabIndex: number = 0;
  visibleTabs: number = 4;
  currentStep: string = 'Net Revenue';


  tabs = [
    { name: 'Net Revenue', label: 'Net Revenue' },
    { name: 'Revenue Breakdown', label: 'Revenue Breakdown' },
    { name: 'Average Order Value', label: 'Average Order Value' },
    { name: 'Revenue By Location', label: 'Revenue By Location' },
    { name: 'Revenue By Item', label: 'Revenue By Item' },
    { name: 'Lost Revenue', label: 'Lost Revenue' },
    { name: 'Lost Revenue Breakdown', label: 'Lost Revenue Breakdown' },
  ];

  constructor() { }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
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
