/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule ,MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Aggregator } from '../list-aggregator/interface/list-aggregator.interface';
import { FormsModule } from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep'
import { IUpdateAggregator } from '../service/aggregators-service.interface';
import { AGGREGATOR_SERVICE_TOKEN } from '../aggregator.module';
import { aggregatorService } from '../service/aggregators-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { ApiSettingConstants } from '../list-aggregator/const/list-aggregator.const';
import { CloseError, CommonService } from '../../../Core/services/common.service';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { FormDataBuilder, FormValidator, isChangesHappen } from '../add-aggregator/aggregator-validator.service';
import { InlineErrorMsgComponent } from "../../../Shared/inline-error-msg/inline-error-msg.component";
import { CustomError } from '../../authentication/interface/login-interface';


@Component({
  selector: 'app-edit-aggregator-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatInputModule, InlineErrorMsgComponent],
  templateUrl: 'updateAggregator.component.html',
  styleUrl: './updateAggregator.component.scss',
  providers : [ ApiSettingConstants,ToasterService,CommonService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true, // This allows multiple interceptors
      },
      { provide: AGGREGATOR_SERVICE_TOKEN, useClass: aggregatorService  }]
})
export class EditAggregatorDialogComponent {
  errorMessages: string = ''
  isErrorOccur:boolean = false;
  previousData : Aggregator 
  validationError : string[] = []
  isLoading : boolean = false
  constructor( public dialogRef: MatDialogRef<EditAggregatorDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Aggregator, @Inject(AGGREGATOR_SERVICE_TOKEN) private aggregatorService :  IUpdateAggregator ) {
    this.previousData = cloneDeep(data) 
  }

  submitForm():void {
    this.validationError = FormValidator.validateAggregatorForm(this.data);
    if (this.validationError && this.validationError.length) {
      return;
    }
    const preparedFormData = FormDataBuilder.prepareAggregatorDataForEdit(this.data);
    if(isChangesHappen(this.previousData , preparedFormData) > 0){
      if(this.validationError.length == 0){
        this.isLoading = true;
        this.aggregatorService.updateAggregator(preparedFormData,preparedFormData.id ).subscribe({
          next : () => {
            this.dialogRef.close(true);
          },
          error: (error : CustomError) => {
            this.errorMessages = error.message
            this.isErrorOccur = true;
          },
        })
      }
    }else{
      this.dialogRef.close(false);
    }
  }

  // When click on close icon on inline error message
  closeInlineError():void{
  const errorState = { errorMessages: this.errorMessages, isErrorOccur: this.isErrorOccur }
      CloseError.closeInlineError(errorState);
      this.errorMessages = errorState.errorMessages;
      this.isErrorOccur = errorState.isErrorOccur;
  }
}
