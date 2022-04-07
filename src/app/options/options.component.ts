import { CaffeineService } from './../services/caffeine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass'],
})
export class OptionsComponent implements OnInit {
  totalConsumption = { days: 0, caffeine: 0, numberDrinks: 0, average: 0};
  constructor(public caffeineService: CaffeineService) {}

  ngOnInit(): void {
    this.getTotalConsumed();
  }

  getTotalConsumed() {
    let days = this.caffeineService.getCaffeineDays();

    days.forEach((day) => {
      this.totalConsumption.days++;
      day.caffeine.forEach((drink) => {
        this.totalConsumption.numberDrinks++;
        this.totalConsumption.caffeine += drink.caffeine;
      });
    });

    this.totalConsumption.average = this.totalConsumption.caffeine / this.totalConsumption.days;
  }
}
