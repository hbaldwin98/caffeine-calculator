import { AddCaffeineComponent } from './../add-caffeine/add-caffeine.component';
import { CaffeineService } from './../services/caffeine.service';
import { Caffeine } from './../models/caffeine';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Day } from '../models/day';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  caffeineByDay: Day[] = [];
  caffeine!: Caffeine;
  caffeineInSystem!: number;
  modalRef?: BsModalRef;

  constructor(public caffeineService: CaffeineService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getCaffeineDays()
    this.caffeineInSystem = this.caffeineService.calculateInSystem();
  }

  removeCaffeine(caffeine: Caffeine) {
    this.caffeineService.removeCaffeine(caffeine);
    this.getCaffeineDays();
  }

  getCaffeineDays() {
    this.caffeineByDay = this.caffeineService.getCaffeineDays();
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCaffeineComponent);
  }
}
