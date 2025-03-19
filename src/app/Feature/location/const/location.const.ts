export class LocationConstant {
    columns = ['checkbox','name','city','locationId','AssociateItem','menuStatus','locationStatus','actionBar']
    All = 'All'
    Active = 'Active'
    recordStateList = ['Active' , 'Archived']
    aggregatorList = ['All','Swiggy']
    cities = ['New York', 'Los Angeles', 'Chicago'];
    tags = ['tag1', 'tag1', 'tag1'];
    items = ['item1', 'item1', 'item1'];
    storeStatus = ['verificationStatus1', 'verificationStatus1', 'verificationStatus1'];
    publishStatus = ['publishStatus1', 'publishStatus1', 'publishStatus1'];
    verificationStatus = ['verificationStatus1', 'verificationStatus1', 'verificationStatus1'];
    titleForArchiveRecord = 'Action Confirmation'
    contextForArchiveRecord  = 'Are you sure you want to Archive this record';
    Archived =  'Archived';
    contextForActiveRecord = 'Are you sure you want make this record Active'
    Error={
        ER01:'Location Name is required',
        ER02:'Address is required',
        ER03:'City Name is required',
        ER04:'Phone No is required',
        ER05:'Email is required',
        ER06:'Invalid Email Format',
        ER07:'Please correct your Phone No. Format',
    }
}