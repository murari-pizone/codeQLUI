import { Component } from '@angular/core';

interface Channel {
  name: string;
  icon: string;
}

interface Platform {
  name: string;
  logo: string;
  isAssociated: boolean;
}

@Component({
  selector: 'app-item-tab-platform',
  standalone: true,
  imports: [],
  templateUrl: './item-tab-platform.component.html',
  styleUrl: './item-tab-platform.component.scss'
})
export class ItemTabPlatformComponent {
  channels: Channel[] = [
    { name: 'App', icon: 'th' },
    { name: 'Web', icon: 'globe' }
  ];

  platforms: Platform[] = [
    { name: 'Zomato', logo: 'path-to-zomato-logo.png', isAssociated: false },
    { name: 'Swiggy', logo: 'path-to-swiggy-logo.png', isAssociated: true }
  ];
}
