import { CaffeineService } from './../services/caffeine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass'],
})
export class OptionsComponent implements OnInit {
  constructor(public caffeineService: CaffeineService) {}

  ngOnInit(): void {}
}
