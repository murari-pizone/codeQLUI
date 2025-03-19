/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResizableModule } from 'angular-resizable-element';
import { LoaderComponent } from "../../../Shared/loader/loader.component";
import { CustomError } from '../../authentication/interface/login-interface';
import { InlineErrorMsgComponent } from "../../../Shared/inline-error-msg/inline-error-msg.component";
import { CloseError } from '../../../Core/services/common.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CreateOutletConf } from '../management/interface/sync-menu-interface';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateOutletService } from './create-outlet.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';

@Component({
  selector: 'app-create-outlets',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, CommonModule, ResizableModule, LoaderComponent, InlineErrorMsgComponent,MatDialogModule],
  templateUrl: './create-outlets.component.html',
  styleUrl: './create-outlets.component.scss',
  providers: [DatePipe , ToastrService,
    {
          provide: HTTP_INTERCEPTORS,
          useClass: GlobalInterceptor,
          multi: true, // This allows multiple interceptors
        },
  ]
})
export class CreateOutletsComponent {
  branchForm: FormGroup;
  currentDate: string = new Date().toISOString().slice(0, 16); // Get current date-time in YYYY-MM-DDTHH:MM format
  submitted: boolean = false; // Track if form has been submitted
  isLoading : boolean = false;
  errorMessages: string = ''
  isErrorOccur:boolean= false;
  title: string;
  
  constructor(public dialogRef: MatDialogRef<CreateOutletsComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateOutletConf,private fb: FormBuilder , readonly syncService:CreateOutletService,private datePipe: DatePipe , private toastr : ToastrService) {

    this.title = data.title;
    // assigning this for remove error on brachFrom we have to assign in constructor 
    this.branchForm = this.fb.group({
      ExtPlatform: ['swiggy', Validators.required],
      NetUpdUsr: [''],
    });
    this.assignModel(data);
  }

  onFromSubmit():void{
    if(this.data.create){
      this.onSubmit();
    }else{
      this.updateOutlet();
    }
  }

  onSubmit() : void {
    this.submitted = true; // Set submitted to true when the form is submitted
    if (this.branchForm.invalid) {
      return;
    }else{
      this.changeDateFormats()
      this.isLoading = true;
      this.syncService.createOutlets(this.branchForm.value).subscribe({
        next : (response) => {
          this.isLoading = false;
          this.resetForm();
          console.log(response);
          this.toastr.success('Outlet created successfully', 'Success' , {
            positionClass: 'toast-top-center',
          });
          this.dialogRef.close(true);
        }, 
        error : (error : CustomError) => {
          this.isLoading = false;
          this.errorMessages = error.error?.error as string 
          this.isErrorOccur = true;
        }
      })
    }
    console.log('Form Data:', this.branchForm.value);
  }

  // Reset the submitted flag and remove errors when input is focused
  resetErrors() : void{
    this.submitted = false; // Reset the submitted flag when an input is focused
  }

  // When click on close icon on inline error message
    closeInlineError(): void {
      const errorState = { errorMessages: this.errorMessages, isErrorOccur: this.isErrorOccur }
      CloseError.closeInlineError(errorState);
      this.errorMessages = errorState.errorMessages;
      this.isErrorOccur = errorState.isErrorOccur;
    }

    changeDateFormats():void{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(this.branchForm.value && this.branchForm.value &&  this.branchForm.value.enaDisTime && this.branchForm.value.NetUpdTime){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        this.branchForm.value.enaDisTime = this.datePipe.transform(this.branchForm.value.enaDisTime, 'yyyy-MM-ddTHH:mm:ss')!.toString();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        this.branchForm.value.NetUpdTime = this.datePipe.transform(this.branchForm.value.NetUpdTime, 'yyyy-MM-ddTHH:mm:ss')!.toString();
      }
    }

    resetForm():void{
      this.branchForm.reset({
        ExtPlatform: 'swiggy',
        brcode: '',
        brname: '',
        liveFlg: 'ENABLED',
        reasonfordisabled: '',
        enaDisTime: this.currentDate,
        enaDisUsr: '',
        ExtPlatformURLOrderCancel: '',
        ExtPlatformURLOrderStatus: '',
        ExtPlatformURLLoctionOnOff: '',
        ExtPlatformURLInventory: '',
        ExtPlatformURL: '',
        apikeyExtupd: '',
        NetOnOff: 'ON',
        NetUpdUsr: '',
        NetUpdTime: this.currentDate,
        NetUpdReson: '',
        InventoryMaintainYN: 'Yes'
      });
      this.submitted = false;
    }

    close(): void {
      this.dialogRef.close(false);
    }

    updateOutlet() : void {
      this.submitted = true; // Set submitted to true when the form is submitted
      if (this.branchForm.invalid) {
        return;
      }else{
        this.changeDateFormats()
        this.isLoading = true;
        this.syncService.createOutlets(this.branchForm.value).subscribe({
          next : (response) => {
            this.isLoading = false;
            this.resetForm();
            console.log(response);
            this.toastr.success('Outlet created successfully', 'Success' , {
              positionClass: 'toast-top-center',
            });
            this.dialogRef.close(true);
          }, 
          error : (error : CustomError) => {
            this.isLoading = false;
            this.errorMessages = error.error?.error as string 
            this.isErrorOccur = true;
          }
        })
      }
      console.log('Form Data:', this.branchForm.value);
    }

    assignModel(data:CreateOutletConf):void{
      if(data.create){
        this.branchForm = this.fb.group({
          ExtPlatform: ['swiggy', Validators.required],
          brcode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          brname: ['', Validators.required],
          liveFlg: ['ENABLED', Validators.required], // Default value 'Y'
          reasonfordisabled: [''],
          enaDisTime: [this.currentDate], // Set current date-time
          enaDisUsr: [''],
          ExtPlatformURLOrderCancel: [''],
          ExtPlatformURLOrderStatus: [''],
          ExtPlatformURLLoctionOnOff: [''],
          ExtPlatformURLInventory: [''],
          ExtPlatformURL: [''],
          apikeyExtupd: [''],
          NetOnOff: ['ON', Validators.required], // Default value 'ON'
          NetUpdUsr: [''],
          NetUpdTime: [this.currentDate], // Set current date-time
          NetUpdReson: ['', Validators.required],
          InventoryMaintainYN: ['Yes', Validators.required] // Default value 'Y'
        });
      }else{
        this.branchForm = this.fb.group({
          ExtPlatform: [data.data[0].ExtPlatform, Validators.required],
          brcode: [data.data[0].brcode, [Validators.required, Validators.pattern('^[0-9]*$')]],
          brname: [data.data[0].brname, Validators.required],
          liveFlg: [data.data[0].liveFlg, Validators.required], // Default value 'Y'
          reasonfordisabled: [data.data[0].reasonfordisabled],
          enaDisTime: [new Date(data.data[0].enaDisTime).toISOString().slice(0, 16)], // Set current date-time
          enaDisUsr: [data.data[0].enaDisUsr],
          ExtPlatformURLOrderCancel: [data.data[0].ExtPlatformURLOrderCancel],
          ExtPlatformURLOrderStatus: [data.data[0].ExtPlatformURLOrderStatus],
          ExtPlatformURLLoctionOnOff: [data.data[0].ExtPlatformURLLoctionOnOff],
          ExtPlatformURLInventory: [data.data[0].ExtPlatformURLInventory],
          ExtPlatformURL: [data.data[0].ExtPlatformURL],
          apikeyExtupd: [data.data[0].apikeyExtupd],
          NetOnOff: [data.data[0].NetOnOff, Validators.required], // Default value 'ON'
          NetUpdUsr: [data.data[0].NetUpdUsr],
          NetUpdTime: [data.data[0].NetUpdTime], // Set current date-time
          NetUpdReson: [data.data[0].NetUpdReson, Validators.required],
          InventoryMaintainYN: [data.data[0].InventoryMaintainYN, Validators.required] // Default value 'Y'
        });
      }
    }
}
