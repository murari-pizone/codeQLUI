import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomError } from '../../../authentication/interface/login-interface';
import { CloseError } from '../../../../Core/services/common.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateOutletService } from '../../create-outlets/create-outlet.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CreateMenuItemConf } from '../interface/sync-menu-interface';
import { InlineErrorMsgComponent } from '../../../../Shared/inline-error-msg/inline-error-msg.component';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { ResizableModule } from 'angular-resizable-element';

@Component({
  selector: 'app-add-menu-item',
  standalone: true,
  imports: [FormsModule, CommonModule,MatDialogModule,InlineErrorMsgComponent,ReactiveFormsModule,LoaderComponent,
 RouterModule, ResizableModule

  ],
  templateUrl: './add-menu-item.component.html',
  styleUrl: './add-menu-item.component.scss',
  providers:[]
})
export class AddMenuItemComponent {
 itemForm: FormGroup;
  currentDate: string = new Date().toISOString().slice(0, 16); // Get current date-time in YYYY-MM-DDTHH:MM format
  submitted: boolean = false; // Track if form has been submitted
  isLoading : boolean = false;
  errorMessages: string = ''
  isErrorOccur:boolean= false;
  title: string;
  
  constructor(public dialogRef: MatDialogRef<AddMenuItemComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateMenuItemConf,private fb: FormBuilder , readonly syncService:CreateOutletService, private toastr : ToastrService) {

    this.title = data.title;
    // assigning this for remove error on brachFrom we have to assign in constructor 
    this.itemForm = this.fb.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ExtPlatform: ['swiggy', Validators.required],
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
    if (this.itemForm.invalid) {
      return;
    }else{
      // this.changeDateFormats()
      this.isLoading = true;
      this.syncService.createMenuItem(this.itemForm.value).subscribe({
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
    console.log('Form Data:', this.itemForm.value);
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

    // changeDateFormats():void{
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   if(this.itemForm.value && this.itemForm.value &&  this.itemForm.value.enaDisTime && this.itemForm.value.NetUpdTime){
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    //     this.itemForm.value.enaDisTime = this.datePipe.transform(this.itemForm.value.enaDisTime, 'yyyy-MM-ddTHH:mm:ss')!.toString();
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    //     this.itemForm.value.NetUpdTime = this.datePipe.transform(this.itemForm.value.NetUpdTime, 'yyyy-MM-ddTHH:mm:ss')!.toString();
    //   }
    // }

    resetForm():void{
      this.itemForm.reset({
        Region: "North",
        ExtPlatform: "swiggy",
        SubCatSort_order: 1,
        ExtSubcatId: "EXT001",
        ExtSubcat: "testcategory A",
        CatSort_order: 2,
        CatId: "CAT001",
        ExtCat: "tesexternal Category",
        Cat: "",
        OptnGrpId: "GRP001",
              // eslint-disable-next-line @typescript-eslint/unbound-method
        Icode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
              // eslint-disable-next-line @typescript-eslint/unbound-method
        Iname: ['', Validators.required],
        WebIname: "Web Item Name",
        frmtime: "2025-01-29T08:00:00",
        totime: "2025-01-29T22:00:00",
        popitemYN: "Y",
        optionSaleYN: "N",
              // eslint-disable-next-line @typescript-eslint/unbound-method
        LiveStatus: ['Active', Validators.required],
        Uom: "KG",
        included_platforms: "Platform1, Platform2",
        WebItmDescription: "This is a sample item description.",
        Sort_Order: 3,
        Recommended: "Yes",
        FoodType: 1,
        OptionGroupName: null
    });
      this.submitted = false;
    }

    close(): void {
      this.dialogRef.close(false);
    }

    updateOutlet() : void {
      this.submitted = true; // Set submitted to true when the form is submitted
      if (this.itemForm.invalid) {
        return;
      }else{
        // this.changeDateFormats()
        this.isLoading = true;
        this.syncService.createMenuItem(this.itemForm.value).subscribe({
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
      console.log('Form Data:', this.itemForm.value);
    }

    assignModel(data:CreateMenuItemConf):void{
      console.log('data--in--popup',data)
      if(data.create){

        this.itemForm = this.fb.group(
        {
          Region: "North",
                // eslint-disable-next-line @typescript-eslint/unbound-method
          ExtPlatform: ['swiggy', Validators.required],
          SubCatSort_order: 1,
          ExtSubcatId: "",
          ExtSubcat: "",
          CatSort_order: 2,
          CatId: "",
          ExtCat: "",
          Cat: "",
          OptnGrpId: "",      // eslint-disable-next-line @typescript-eslint/unbound-method
          Icode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],      // eslint-disable-next-line @typescript-eslint/unbound-method
          Iname: ['', Validators.required],
          WebIname: "",
          frmtime: "",
          totime: "",
          popitemYN: "No",
          optionSaleYN: "",      // eslint-disable-next-line @typescript-eslint/unbound-method
          LiveStatus: ['Active', Validators.required],
          Uom: "",
          included_platforms: "",
          WebItmDescription: "",
          Sort_Order: 3,
          Recommended: "",
          FoodType: 1,
          OptionGroupName: null
      });
      }else{
        this.itemForm = this.fb.group({      // eslint-disable-next-line @typescript-eslint/unbound-method
          ExtPlatform: [data.data[0].ExtPlatform, Validators.required],
          Region:data.data[0].Region,
          SubCatSort_order:data.data[0].SubCatSort_order,
          ExtSubcatId:data.data[0].ExtSubcatId,
          ExtSubcat:data.data[0].ExtSubcat,
          CatSort_order:data.data[0].CatSort_order,
          CatId:data.data[0].CatId,
          OptnGrpId:data.data[0].OptnGrpId,
          WebIname:data.data[0].WebIname,
          frmtime:data.data[0].frmtime,
          totime:data.data[0].totime,
          optionSaleYN:data.data[0].optionSaleYN,
          Uom:data.data[0].Uom,
          included_platforms:data.data[0].included_platforms,
          WebItmDescription:data.data[0].WebItmDescription,
          Sort_Order:data.data[0].Sort_Order,
          Recommended:data.data[0].Recommended,
          FoodType:data.data[0].FoodType,
          OptionGroupName:data.data[0].OptionGroupName,
          ExtCat: [data.data[0].ExtCat],
          Cat: [data.data[0].Cat], // Set current date-time
                // eslint-disable-next-line @typescript-eslint/unbound-method
          Icode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
                          // eslint-disable-next-line @typescript-eslint/unbound-method
          Iname: [data.data[0].Iname, Validators.required],
          popitemYN: [false], // Default value 'ON'
                          // eslint-disable-next-line @typescript-eslint/unbound-method
          LiveStatus: ['Active', Validators.required], // Default value 'Y'
        });
      }
    }

    get popitemYN(): boolean {
      return this.itemForm.get('popitemYN')?.value as boolean || false;
    }

    
}
