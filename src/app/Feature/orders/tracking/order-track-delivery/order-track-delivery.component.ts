import { Component, Inject, OnInit } from '@angular/core';
import { Coordinates, Order, OrderStatus, SyncTrackOrderListData, SyncTrackPopupData } from '../interface/trackOrder-interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SmallMapComponent } from '../small-map/small-map.component';
import { DateFormatPipe } from '../../../../Shared/pipes/date-format.pipe';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

declare global {
  interface Window {
    bootstrap: {
      Offcanvas: any;
      Modal: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
      };
    };
  }
}

@Component({
  selector: 'app-order-track-delivery',
  standalone: true,
  imports: [FormsModule, CommonModule, SmallMapComponent,DateFormatPipe,MatDialogModule, MatButtonModule],
  templateUrl: './order-track-delivery.component.html',
  styleUrl: './order-track-delivery.component.scss',
  providers:[DateFormatPipe]
})
export class OrderTrackDeliveryComponent implements OnInit {

  orderData:SyncTrackOrderListData[]=[];
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  filterStatus: string = 'All';
  sortBy: 'status' | 'estimatedDelivery' = 'status';
  state: number = 3;
  stateMax: number = 1;
  orderStatus :{ [key: number]: string } = {0 : 'Confirmed', 1 : 'Arrived', 2: 'Picked Up', 3 : 'Delivered'};
  statusIndexMap: { [key: string]: number } = {
    'Confirmed': 0,
    'Arrived': 1,
    'Picked Up': 2,
    'Delivered': 3,
  };

  private modal: {
    show: () => void;
    hide: () => void;
  } | null = null;


  constructor(public dialogRef: MatDialogRef<OrderTrackDeliveryComponent>,@Inject(MAT_DIALOG_DATA) public  data:  SyncTrackPopupData) { 
    console.log('data/,',data.data)
    if(data.data){
      this.setPopupData(data.data)
      this.orderData = data.data;
    }
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders = [
      this.createOrder(1, 'John Doe', 'Mike Smith', '123 Main St', { lat: 40.7128, lng: -74.0060 })
    ];
    this.filteredOrders = [...this.orders]; // Clone initial orders
  }
  createOrder(id: number, customerName: string, driverName: string, currentLocation: string, coordinates: Coordinates): Order {
    const now = Date.now();
    return {
      id,
      status: 'Confirmed',
      customerName,
      driverName,
      driverContact: '+1 555-1234',
      currentLocation,
      estimatedDelivery: new Date(now + 60 * 60000).toString(), // Example: 60 minutes from now
      timeline: [
        { status: 'Confirmed', timestamp: new Date(now - 30 * 60000).toString() },
        { status: 'Arrived', timestamp: '' },
        { status: 'Picked Up', timestamp: '' },
        { status: 'Delivered', timestamp: '' }
      ],
      coordinates
    };
  }

  simulateRealTimeUpdates(): void {
    const updatedOrders = [...this.orders];
    const randomIndex = Math.floor(Math.random() * updatedOrders.length);
    const randomOrder = updatedOrders[randomIndex];
    if (randomOrder.status !== 'Delivered') {
      const newStatus = this.getNextStatus(randomOrder.status);
      randomOrder.status = newStatus;
      randomOrder.timeline[this.statusIndexMap[newStatus]] = { status: newStatus, timestamp: new Date().toString() };
    }
    this.orders = updatedOrders;
  }

  getNextStatus(currentStatus: OrderStatus['status']): OrderStatus['status'] {
    const statuses: (OrderStatus['status'])[] = ['Confirmed', 'Arrived', 'Picked Up', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    return statuses[(currentIndex + 1) % statuses.length];
  }

  // applyFilter(): void {
  //   const filtered = this.filterStatus === 'All' ? this.orders : this.orders.filter(order => order.status === this.filterStatus);
  //   filtered.sort((a, b) => {
  //     if (this.sortBy === 'status') {
  //       return a.status.localeCompare(b.status);
  //     } else {
  //       return (a.estimatedDelivery.getTime() - b.estimatedDelivery.getTime()).toString;
  //     }
  //   });
  //   this.filteredOrders = filtered;
  // }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'Confirmed': 'bg-teal-500',
      'Arrived': 'bg-yellow-500',
      'Cancel': 'bg-red-500',
      'Delivered': 'bg-green-500',
    };
    return colorMap[status] || '';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'Confirmed': 'bi bi-box-seam',
      'Arrived': 'bi bi-truck',
      'Picked Up': 'bi bi-truck',
      'Delivered': 'bi bi-check2-circle',
    };
    return iconMap[status] || '';
  }
  empty(): void {
    console.log('empty')
  }

  // ngAfterViewInit(): void {
  //   // const modalElement = document.getElementById('orderTrackId') as HTMLElement; // Ensure it's treated as HTMLElement
  //   // if (modalElement) {
  //   //   this.modal = new window.bootstrap.Modal(modalElement);
  //   // } else {
  //     console.error("Modal element not found!");
  //   // }
  // }

  openModal(): void {
    if (this.modal) {
      this.modal.show(); // Call to show the modal
    }
    if(this.filteredOrders[0]['timeline']){
      let flag=-1;
      this.filteredOrders[0]['timeline'].forEach(element => {
        if(element.timestamp){
          flag++;
        }
      });
      this.state = flag;
    }
  }

  closeModal(): void {
    if (this.modal) {
      setInterval(() => this.simulateRealTimeUpdates(), 2500);
      this.modal.hide(); // Call to hide the modal
    }
  }

  calculateProgressBarWidth(): string {
    return `${(this.state / this.stateMax) * 100}%`;
  }

    // when click on cross icons
    closeDialog():void{
        this.dialogRef.close(false)
    }
    close():void{
      this.dialogRef.close(false);
    }
  setPopupData(data: SyncTrackOrderListData[]): void {
    data.forEach((element: SyncTrackOrderListData) => {
      if (element.Status === 'CONFIRMED_FROM_ERP') {
        element.Status = 'Confirmed'
      }
      if (element.Status === 'CANCELLED') {
        element.Status = 'Cancel'
      }
      if (element.Status === 'ORDER_RECEIVED') {
        element.Status = 'Delivered'
      }
    });
  }
  }
