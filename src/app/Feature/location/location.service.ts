import { Injectable } from '@angular/core';
// import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../Core/services/common.service';
import { LocationRows } from './interface/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  
    rows : LocationRows[] = []
    indianCities:string[] =[]
    constructor( readonly http : HttpClient,private readonly CommonService : CommonService ) {
        // this.logger.info('location service loaded') 
      this.rows = [
        { name: 'Location First', city: 'GangaNagar', locationId: 'A2B001', MenuStatus: 'Verified', associateItems: 120, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '123 Main Street', phoneNo: 1234567890, email: 'location1@example.com' },
        { name: 'Location Second', city: 'Jaipur', locationId: 'A2B002', MenuStatus: 'Pending', associateItems: 98, locationStatus: 'Active', isChecked: false, locationCount: 10, address: '456 Elm Street', phoneNo: 2345678901, email: 'location2@example.com' },
        { name: 'Location Third', city: 'Udaipur', locationId: 'A2B003', MenuStatus: 'Verified', associateItems: 65, locationStatus: 'Archived', isChecked: false, locationCount: 5, address: '789 Oak Avenue', phoneNo: 3456789012, email: 'location3@example.com' },
        { name: 'Location Fourth', city: 'Jodhpur', locationId: 'A2B004', MenuStatus: 'Verified', associateItems: 300, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '101 Pine Lane', phoneNo: 4567890123, email: 'location4@example.com' },
        { name: 'Location Fifth', city: 'Ajmer', locationId: 'A2B005', MenuStatus: 'Pending', associateItems: 240, locationStatus: 'Active', isChecked: false, locationCount: 16, address: '202 Maple Drive', phoneNo: 5678901234, email: 'location5@example.com' },
        { name: 'Location Sixth', city: 'Kota', locationId: 'A2B006', MenuStatus: 'Verified', associateItems: 190, locationStatus: 'Active', isChecked: false, locationCount: 31, address: '303 Birch Road', phoneNo: 6789012345, email: 'location6@example.com' },
        { name: 'Location Seventh', city: 'Bikaner', locationId: 'A2B007', MenuStatus: 'Pending', associateItems: 87, locationStatus: 'Archived', isChecked: false, locationCount: 41, address: '404 Cedar Boulevard', phoneNo: 7890123456, email: 'location7@example.com' },
        { name: 'Location Eighth', city: 'Alwar', locationId: 'A2B008', MenuStatus: 'Verified', associateItems: 210, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '505 Spruce Avenue', phoneNo: 8901234567, email: 'location8@example.com' },
        { name: 'Location Ninth', city: 'Bharatpur', locationId: 'A2B009', MenuStatus: 'Verified', associateItems: 330, locationStatus: 'Active', isChecked: false, locationCount: 2, address: '606 Fir Street', phoneNo: 9012345678, email: 'location9@example.com' },
        { name: 'Location Tenth', city: 'Sikar', locationId: 'A2B010', MenuStatus: 'Pending', associateItems: 450, locationStatus: 'Active', isChecked: false, locationCount: 18, address: '707 Aspen Court', phoneNo: 1023456789, email: 'location10@example.com' },
        { name: 'Location Eleventh', city: 'GangaNagar', locationId: 'A2B011', MenuStatus: 'Verified', associateItems: 112, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '808 Cypress Place', phoneNo: 1235678901, email: 'location11@example.com' },
        { name: 'Location Twelfth', city: 'Jaisalmer', locationId: 'A2B012', MenuStatus: 'Verified', associateItems: 134, locationStatus: 'Archived', isChecked: false, locationCount: 11, address: '909 Redwood Lane', phoneNo: 2346789012, email: 'location12@example.com' },
        { name: 'Location Thirteenth', city: 'Barmer', locationId: 'A2B013', MenuStatus: 'Pending', associateItems: 76, locationStatus: 'Active', isChecked: false, locationCount: 21, address: '1001 Poplar Drive', phoneNo: 3457890123, email: 'location13@example.com' },
        { name: 'Location Fourteenth', city: 'Churu', locationId: 'A2B014', MenuStatus: 'Verified', associateItems: 200, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '1111 Walnut Road', phoneNo: 456890123, email: 'location14@example.com' },
        { name: 'Location Fifteenth', city: 'Pali', locationId: 'A2B015', MenuStatus: 'Verified', associateItems: 180, locationStatus: 'Active', isChecked: false, locationCount: 5, address: '1212 Chestnut Avenue', phoneNo: 5679012345, email: 'location15@example.com' },
        { name: 'Location Sixteenth', city: 'Tonk', locationId: 'A2B016', MenuStatus: 'Pending', associateItems: 156, locationStatus: 'Active', isChecked: false, locationCount: 7, address: '1313 Hickory Place', phoneNo: 6780123456, email: 'location16@example.com' },
        { name: 'Location Seventeenth', city: 'Dholpur', locationId: 'A2B017', MenuStatus: 'Verified', associateItems: 145, locationStatus: 'Archived', isChecked: false, locationCount: 18, address: '1414 Magnolia Court', phoneNo: 7891234567, email: 'location17@example.com' },
        { name: 'Location Eighteenth', city: 'Dungarpur', locationId: 'A2B018', MenuStatus: 'Verified', associateItems: 230, locationStatus: 'Active', isChecked: false, locationCount: 100, address: '1515 Sycamore Drive', phoneNo: 8902345678, email: 'location18@example.com' },
        { name: 'Location Nineteenth', city: 'Jhalawar', locationId: 'A2B019', MenuStatus: 'Pending', associateItems: 176, locationStatus: 'Active', isChecked: false, locationCount: 3, address: '1616 Willow Lane', phoneNo: 9013456789, email: 'location19@example.com' },
        { name: 'Location Twentieth', city: 'Sirohi', locationId: 'A2B020', MenuStatus: 'Verified', associateItems: 300, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '1717 Maple Street', phoneNo: 1024567890, email: 'location20@example.com' },
        { name: 'Location Twenty-First', city: 'Banswara', locationId: 'A2B021', MenuStatus: 'Pending', associateItems: 220, locationStatus: 'Archived', isChecked: false, locationCount: 19, address: '1818 Cedar Place', phoneNo: 1236789012, email: 'location21@example.com' },
        { name: 'Location Twenty-Second', city: 'Nagaur', locationId: 'A2B022', MenuStatus: 'Verified', associateItems: 180, locationStatus: 'Active', isChecked: false, locationCount: 71, address: '1919 Birch Avenue', phoneNo: 2347890123, email: 'location22@example.com' },
        { name: 'Location Twenty-Third', city: 'Hanumangarh', locationId: 'A2B023', MenuStatus: 'Pending', associateItems: 250, locationStatus: 'Active', isChecked: false, locationCount: 32, address: '2020 Aspen Road', phoneNo: 3458901234, email: 'location23@example.com' },
        { name: 'Location Twenty-Fourth', city: 'Bundi', locationId: 'A2B024', MenuStatus: 'Verified', associateItems: 270, locationStatus: 'Archived', isChecked: false, locationCount: 27, address: '2121 Redwood Lane', phoneNo: 4569012345, email: 'location24@example.com' },
        { name: 'Location Twenty-Fifth', city: 'Sawai Madhopur', locationId: 'A2B025', MenuStatus: 'Pending', associateItems: 190, locationStatus: 'Active', isChecked: false, locationCount: 1, address: '2222 Poplar Drive', phoneNo: 5670123456, email: 'location25@example.com' },
        { name: 'Location Twenty-Sixth', city: 'Chittorgarh', locationId: 'A2B026', MenuStatus: 'Verified', associateItems: 310, locationStatus: 'Active', isChecked: false, locationCount: 98, address: '2323 Walnut Road', phoneNo: 6781234567, email: 'location26@example.com' },
        { name: 'Location Twenty-Seventh', city: 'Rajsamand', locationId: 'A2B027', MenuStatus: 'Pending', associateItems: 140, locationStatus: 'Archived', isChecked: false, locationCount: 75, address: '2424 Hickory Place', phoneNo: 7892345678, email: 'location27@example.com' },
        { name: 'Location Twenty-Eighth', city: 'Pratapgarh', locationId: 'A2B028', MenuStatus: 'Verified', associateItems: 215, locationStatus: 'Active', isChecked: false, locationCount: 49, address: '2525 Sycamore Drive', phoneNo: 8903456789, email: 'location28@example.com' },
        { name: 'Location Twenty-Ninth', city: 'Karauli', locationId: 'A2B029', MenuStatus: 'Pending', associateItems: 185, locationStatus: 'Active', isChecked: false, locationCount: 28, address: '2626 Willow Lane', phoneNo: 9014567890, email: 'location29@example.com' },
        { name: 'Location Thirtieth', city: 'Baran', locationId: 'A2B030', MenuStatus: 'Verified', associateItems: 320, locationStatus: 'Active', isChecked: false, locationCount: 39, address: '2727 Maple Street', phoneNo: 1025678901, email: 'location30@example.com' }
      ];

      this.indianCities = [
        "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat", "Lucknow", "Kanpur", "Nagpur",
        "Indore", "Bhopal", "Vadodara", "Patna", "Ludhiana", "Agra", "Nashik", "Ranchi", "Guwahati", "Coimbatore", "Kochi", "Thiruvananthapuram",
        "Mysuru", "Jodhpur", "Udaipur", "Amritsar", "Varanasi", 'GangaNagar', 'Ajmer', 'Kota', 'Bikaner', 'Alwar', 'Bharatpur', 'Sikar', 'Jaisalmer', 'Barmer',
        'Churu', 'Pali', 'Tonk', 'Dholpur', 'Dungarpur', 'Jhalawar', 'Sirohi', 'Banswara', 'Nagaur', 'Hanumangarh', 'Bundi', 'Sawai Madhopur', 'Chittorgarh',
        'Rajsamand', 'Pratapgarh', 'Karauli', 'Baran'
      ];
        
    }
    apiUrl = this.CommonService.baseUrl;
    // For Getting Rows data for dashboard
    getData():Observable<LocationRows[]>{
       return of(this.rows)
    }
  }