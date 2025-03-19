import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NGXLogger } from 'ngx-logger';
import { AppLoggerModule } from '../../../../Core/logger.module';
import { Aggregator } from '../interface/list-aggregator.interface';
import { AddAggregatorDialogComponent } from '../../add-aggregator/addAggregator.component';
import { EditAggregatorDialogComponent } from '../../update-aggregator/updateAggregator.component';
import { ApiSettingConstants } from '../const/list-aggregator.const';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ToastrService as ToasterService } from 'ngx-toastr';
import { CommonResponseJson } from '../../../../Shared/const/common.constant';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../../Core/interceptors/global.interceptor';
import { InlineErrorMsgComponent } from "../../../../Shared/inline-error-msg/inline-error-msg.component";
import { CloseError, CommonService } from '../../../../Core/services/common.service';
import { AGGREGATOR_SERVICE_TOKEN } from '../../aggregator.module';
import { IGetAggregators, IUpdateAggregator } from '../../service/aggregators-service.interface';
import { aggregatorService } from '../../service/aggregators-service';
import { FormDataBuilder } from '../../add-aggregator/aggregator-validator.service';
import { CustomError } from '../../../authentication/interface/login-interface';

@Component({
  selector: 'app-api-setting',
  standalone: true,
  imports: [AppLoggerModule, MatButtonModule, MatCardModule, MatIconModule, MatSlideToggleModule, LoaderComponent, ClipboardModule, InlineErrorMsgComponent],
  templateUrl: './list-aggregator.component.html',
  styleUrl: './list-aggregator.component.scss',
  providers:[ApiSettingConstants,ToasterService,CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    { provide: AGGREGATOR_SERVICE_TOKEN, useClass: aggregatorService  }
  ]
})
export class aggregatorListComponent implements OnInit {
  aggregators : Aggregator[] = []
  loadingSpinner : boolean = false;
  constructor(private readonly logger : NGXLogger,readonly dialog: MatDialog ,readonly constant : ApiSettingConstants,readonly toaster: ToasterService,
    public commonService : CommonService , @Inject(AGGREGATOR_SERVICE_TOKEN) private aggregatorService : IGetAggregators & IUpdateAggregator
   ){
    this.logger.info('info')
  }
  ngOnInit() : void {
    this.getAggregator()
  }

  errorMsg:string = '';
  isErrorOccur:boolean = false;

  // below method is use to Getting list of aggregators 
  getAggregator(): void {
    this.loadingSpinner = true;
    this.aggregatorService.getAggregators().subscribe({
      next: ({ statusCode, data }: CommonResponseJson) => {
        if (statusCode === 200) {
          this.commonService.getAggregators();
          this.aggregators = (data as Aggregator[]).map((ele) => ({...ele,toggleStatusButton: ele?.status === this.constant.active,}));
        }
      },
      error: ({ customMessage }: CustomError) => {
        this.isErrorOccur = true;
        this.errorMsg = customMessage as string;
      },
      complete: () => (this.loadingSpinner = false),
    });
  }

  // when click to add aggregator button it will emit addAggregator Component
  addAggregator() : void {
    const dialogRef = this.dialog.open(AddAggregatorDialogComponent,{disableClose: true}  )
    dialogRef.afterClosed().subscribe((result:Aggregator) => {
      if (result) {
        this.getAggregator();
      }
    });
  }

  // changing status of aggregator make them stablish or disable 
  toggleStatus(aggregator: Aggregator) : void{
    aggregator.toggleStatusButton = !aggregator.toggleStatusButton
    const updatedAggregator : Aggregator = { ...aggregator, status: aggregator.toggleStatusButton ? this.constant.active : this.constant.inactive};
    this.loadingSpinner = true;
    const formData = FormDataBuilder.prepareAggregatorDataForEdit(aggregator)
      this.aggregatorService.updateAggregator(formData,updatedAggregator.id).subscribe({
        next : () => {
          this.loadingSpinner = false;
          this.getAggregator()
        },
        error : (error : CustomError) => {
          this.loadingSpinner = false
          this.isErrorOccur = true;
          this.errorMsg = error.message
        },
      })
  }

  // when toggle to confirm button of aggregator
  autoConfirm(aggregator:Aggregator):void{
    aggregator['auto_order_confirm'] = !aggregator?.auto_order_confirm;
    const formData = FormDataBuilder.prepareAggregatorDataForEdit(aggregator)
    this.loadingSpinner = true;
    this.aggregatorService.updateAggregator(formData,aggregator.id).subscribe({
       next : () => {
        this.loadingSpinner = false;
        this.getAggregator()
       },
       error : (error : CustomError) => {
         this.loadingSpinner = false
         this.isErrorOccur = true;
         this.errorMsg = error.message
       },
    })
  }
  
  // Editing Existing aggregator
  editAggregator(aggregator: Aggregator) : void {
    const dialogRef = this.dialog.open(EditAggregatorDialogComponent,{ data: { ...aggregator } , disableClose: true});
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result){
        this.loadingSpinner = true;
      }else if(!result){
        this.toaster.info(this.constant.changedNotHappen , this.constant.Information , {
          timeOut:3500,
          progressBar: true, 
          positionClass : 'toast-top-center'
        })
      }
    });
  }

  // when user copy any of text from fields
  onClipboardCopy(successful: boolean): void {
    if (successful) {
      this.toaster.success(this.constant.cTc, this.constant.Successfully, {
        positionClass: 'toast-bottom-right',
        progressBar: true,
        timeOut:2500
      });
    }
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }
  
}
