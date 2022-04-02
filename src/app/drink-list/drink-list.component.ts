import { Component, Input, OnInit } from '@angular/core';
import { Caffeine } from '../models/caffeine';
import { Day } from '../models/day';
import { CaffeineService } from '../services/caffeine.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.sass']
})
export class DrinkListComponent implements OnInit {
  caffeineLast7Days!: any[];
  maxCaffeineDay: number = 0;
  @Input() caffeineByDay!: Day[];

  constructor(private caffeineService: CaffeineService) { }

  ngOnInit(): void {
    this.getCaffeineDays();
    this.getCaffeineLast7Days();
  }


  removeCaffeine(caffeine: Caffeine) {
    this.caffeineService.removeCaffeine(caffeine);
    this.getCaffeineDays();
  }


  getCaffeineDays() {
    this.caffeineByDay = this.caffeineService.getCaffeineDays();
  }

  getCaffeineLast7Days() {
    this.caffeineLast7Days = this.caffeineService.getCaffeineLast7Days();
    this.caffeineLast7Days.forEach((day) => {
      this.maxCaffeineDay = Math.max(this.maxCaffeineDay, day.caffeine);
    });
  }

}
