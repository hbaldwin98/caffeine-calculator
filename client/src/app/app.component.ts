import { CaffeineService } from './services/caffeine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'Caffeine Calculator';
  currentTab!: string;

  constructor(private caffeineService: CaffeineService) {}

  ngOnInit(): void {
    this.setCaffeineData();
  }

  setCaffeineData() {
    let caffeineData = localStorage.getItem('caffeine-data');
    this.caffeineService.setCaffeineDays(caffeineData !== null ? JSON.parse(caffeineData) : null);
  }

  receiveTab($event: string) {
    this.currentTab = $event;
  }


}


