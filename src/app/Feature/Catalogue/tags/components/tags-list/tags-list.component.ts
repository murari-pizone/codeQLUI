import { Component } from '@angular/core';
import { InlineErrorMsgComponent } from '../../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../../Core/services/common.service';
import { CommonModule } from '@angular/common';
import { AggregatorStatus } from '../../interface/tags.interface';
import { TagsConstant } from '../../const/tags.constant';
import { TagsListTableComponent } from '../tags-list-table/tags-list-table.component';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [InlineErrorMsgComponent, CommonModule, TagsListTableComponent],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.scss',
  providers: [TagsConstant]
})
export class TagsListComponent {

  isErrorOccur: boolean = false;
  errorMsg: string = '';
  currentStep: string = 'Active';
  aggregatorList: AggregatorStatus = {
    active: ['Zommato', 'Swiggy', 'Ubereats', 'Amazon'],
    archive: ['Arc Zommato', 'Arc Swiggy', 'Arc Ubereats', 'Arc Amazon']
  }
  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  empty(): void {
    console.log('empty')
  }

}
