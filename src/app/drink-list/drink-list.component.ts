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
  @Input() caffeineByDay!: Day[];

  constructor(private caffeineService: CaffeineService) { }

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
