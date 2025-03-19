import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddForm } from '../list-aggregator/interface/list-aggregator.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { InlineErrorMsgComponent } from '../../../Shared/inline-error-msg/inline-error-msg.component';
import { AGGREGATOR_SERVICE_TOKEN } from '../aggregator.module';
import { IAddAggregator } from '../service/aggregators-service.interface';
import { aggregatorService } from '../service/aggregators-service';
import { FormDataBuilder, FormValidator } from './aggregator-validator.service';
import { CommonModule } from '@angular/common';
import { CloseError } from '../../../Core/services/common.service';
import { CustomError } from '../../authentication/interface/login-interface';


@Component({
  selector: 'app-add-aggregator-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatInputModule,InlineErrorMsgComponent,CommonModule],
  templateUrl: './addAggregator.component.html',
  styleUrls: ['./addAggregator.component.scss'],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    { provide: AGGREGATOR_SERVICE_TOKEN, useClass: aggregatorService  }
  ]
})
export class AddAggregatorDialogComponent {
  formData: AddForm = {
    aggregator_name: '',
    api_key: '',
    secret_key: '',
    endpoint_url: '',
  };
  
  errorMessages: string = ''
  isErrorOccur:boolean= false;
  isLoading = false;
  validationError : string[]  = []
  constructor(public dialogRef: MatDialogRef<AddAggregatorDialogComponent>,@Inject(AGGREGATOR_SERVICE_TOKEN) private aggregatorService : IAddAggregator ) {}

  submitForm(): void {
    this.validationError = FormValidator.validateAggregatorForm(this.formData);
    if (this.validationError && this.validationError.length) {
      return;
    }
    const preparedFormData = FormDataBuilder.prepareAggregatorDataForAdd(this.formData);
 
    this.isLoading = true;
    this.aggregatorService.addAggregator(preparedFormData).subscribe({
      next: () => {
        this.dialogRef.close(this.formData);
        this.isLoading = false;
      },
      error: (error : CustomError) => {
        this.isLoading = false;
        this.errorMessages = error.error?.error as string 
        this.isErrorOccur = true;
      },
    });
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMessages, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMessages = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }
}
