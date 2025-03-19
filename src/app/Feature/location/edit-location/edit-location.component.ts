import { Component, OnInit } from '@angular/core';
// import { LocationCreate } from '../interface/location.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { LocationRows } from '../interface/location.interface';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationConstant } from '../const/location.const';
import { ConfirmationComponent } from '../../../Shared/popup/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-location',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule],
  templateUrl: './edit-location.component.html',
  styleUrl: './edit-location.component.scss'
})
export class EditLocationComponent implements OnInit {
  steps = [
    { label: 'Step 1: Create Location', index: 1 },
    { label: 'Step 2: Location Details', index: 2 },
    { label: 'Step 3: Location Verify', index: 3 },
    // { label: 'Step 4: Confirmation', index: 3 }
  ];
  isConfirmed = false;
  locationData: LocationRows = {
    name : '',
    city : '', 
    locationId : 'A2B' + (this.service.rows.length > 99 ? (this.service.rows.length + 1) : '0'+ (this.service.rows.length+1) ), 
    MenuStatus : '', 
    associateItems : 0,
    locationStatus : '',
    isChecked : false,
    locationCount:0,
    address:'',
    phoneNo:1000000000,
    email:'',
  }
  indianCities:string[] = this.service.indianCities;
  errorList: string[] = []

  currentStep = 1;

  constructor(private readonly service  : LocationService,private readonly route: ActivatedRoute, readonly router:Router,readonly locConst:LocationConstant,readonly popup: MatDialog){

  }
  ngOnInit(): void {
    const locId = this.route.snapshot.paramMap.get('id');
    const editableData = this.service.rows.filter((item:LocationRows)=>{return item.locationId == locId});
    this.locationData = editableData[0];
  }
  goToStep(stepIndex: number): void {
    this.currentStep = stepIndex;
  }

  nextStep(step: number): void {
    if (step == 3) {
      if (this.validateFields()) {
        this.currentStep = step;
      }
    } else {
      this.currentStep = step;
    }
  }

  previousStep(step: number): void {
    this.currentStep = step;
  }
  empty(): void {
    console.log('empty');
  }
  selectArea(type: string): void {
    if(type === 'single'){
      this.locationData.locationCount = 1;
    }else{
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      this.locationData.locationCount = randomNumber;
    }
  }

  validateFields(): boolean {
    let errorCount = 0;
    this.errorList = []
    if (!this.locationData.name?.trim()) {
      this.errorList.push(this.locConst.Error.ER01);
      errorCount++;
    }
    if (!this.locationData.address?.trim()) {
      this.errorList.push(this.locConst.Error.ER02);
      errorCount++;
    }
    if (!this.locationData.city?.trim()) {
      this.errorList.push(this.locConst.Error.ER03);
      errorCount++;
    }
    if (!this.locationData.phoneNo) {
      this.errorList.push(this.locConst.Error.ER04);
      errorCount++;
    }
    if (!this.locationData.email?.trim()) {
      this.errorList.push(this.locConst.Error.ER05);
      errorCount++;
    }
    const haveEmail = !!this.locationData.email?.trim();
    if (haveEmail) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emailValid = emailPattern.test(this.locationData.email);
      if (!(emailValid)) {
        this.errorList.push(this.locConst.Error.ER06);
        errorCount++;
      }
    }
    const havePhone = !!this.locationData.phoneNo;
    if (havePhone) {
      if (!(this.locationData.phoneNo?.toString().length == 10)) {
        this.errorList.push(this.locConst.Error.ER07);
        errorCount++;
      }
    }

    return errorCount == 0;
  }
  removeError(event:string):void{
    const remainingError = this.errorList.filter((item:string)=>{
      return !item.includes(event);
    });
    this.errorList = remainingError;
  }

   // Function to get the error message for a specific control
  getErrorForControl(controlName: string): string | null {

    const returnValue = this.errorList.find(error =>
      error.toLowerCase().includes(controlName.toLowerCase())
    );
    return returnValue || '';
  }
  SubmitLocation(): void {
    if (this.isConfirmed) {
      const index = this.service.rows.findIndex(item => item.locationId == this.locationData.locationId);
      if (index != -1) {
        this.service.rows[index] = this.locationData;
      }
      void this.router.navigateByUrl('/view/location');
    }
  }
  Cancel():void{
    const popupRes = this.popup.open(ConfirmationComponent, { data: { description: 'Are you sure you want to navigate away from the page and discard the unsaved changes?', title: 'Changes Made' , hideCrossIcon: true } });
    popupRes.afterClosed().subscribe((item: boolean) => {
      if (item) {
        void this.router.navigateByUrl('/view/location');
      }
    })
  }
}
