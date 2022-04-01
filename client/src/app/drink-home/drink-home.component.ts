import { AddCaffeineComponent } from './../add-caffeine/add-caffeine.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CaffeineService } from '../services/caffeine.service';

@Component({
  selector: 'app-drink-home',
  templateUrl: './drink-home.component.html',
  styleUrls: ['./drink-home.component.sass'],
})
export class DrinkHomeComponent implements OnInit {
  caffeineInSystem!: number;
  modalRef?: BsModalRef;

  constructor(
    public caffeineService: CaffeineService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.caffeineInSystem = this.caffeineService.calculateInSystem();
  }

  getCaffeineToday() {
    return this.caffeineService.getCaffeineToday();
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCaffeineComponent);
  }
}
