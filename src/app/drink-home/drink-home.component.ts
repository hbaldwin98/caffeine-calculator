import { Caffeine } from './../models/caffeine';
import { AddCaffeineComponent } from './../add-caffeine/add-caffeine.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CaffeineService } from '../services/caffeine.service';
import { Day } from '../models/day';

@Component({
  selector: 'app-drink-home',
  templateUrl: './drink-home.component.html',
  styleUrls: ['./drink-home.component.sass'],
})
export class DrinkHomeComponent implements OnInit {
  drinksToday!: Caffeine[];
  caffeineInSystem!: number;
  modalRef?: BsModalRef;

  constructor(
    public caffeineService: CaffeineService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.caffeineInSystem = this.caffeineService.calculateInSystem();
    this.getDrinksToday();
  }

  getCaffeineToday() {
    this.getDrinksToday();
    return this.caffeineService.getCaffeineToday();
  }

  getDrinksToday() {
    this.drinksToday = this.caffeineService.getDrinksToday();
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCaffeineComponent);
  }
}
