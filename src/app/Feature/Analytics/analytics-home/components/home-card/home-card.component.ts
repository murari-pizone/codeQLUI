import { Component } from '@angular/core';
import { HomeCard } from '../../interface/home-card.interface';
import { HomeCardConstant } from '../../const/home-card.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
  providers: [HomeCardConstant]
})
export class HomeCardComponent {


  homeCards: HomeCard = {
    revenueCardData: [],
    orderCardData: [],
    operationCardData: [],
    catalogueCardData: [],
  }
  constructor(readonly constant: HomeCardConstant) {
    this.homeCards = {
      revenueCardData: this.constant.revenueCardData,
      orderCardData: this.constant.orderCardData,
      operationCardData: this.constant.operationCardData,
      catalogueCardData: this.constant.catalogueCardData,
    }
  }

}
