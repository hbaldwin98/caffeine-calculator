import { CaffeineService } from './../services/caffeine.service';
import { Caffeine } from './../models/caffeine';
import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  caffeineByDay: Day[] = [];
  caffeine!: Caffeine;

  constructor(public caffeineService: CaffeineService) {}

  ngOnInit(): void {
    this.getCaffeineDays();
  }

  removeCaffeine(caffeine: Caffeine) {
    this.caffeineService.removeCaffeine(caffeine);
    this.getCaffeineDays();
  }

  getCaffeineDays() {
    this.caffeineByDay = this.caffeineService.getCaffeineDays();
  }
}
