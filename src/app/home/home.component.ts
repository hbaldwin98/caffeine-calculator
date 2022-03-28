import { CaffeineService } from './../services/caffeine.service';
import { Caffeine } from './../models/caffeine';
import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  caffeineByDay: Day[] = [];
  caffeine!: Caffeine;
  caffeineForm!: FormGroup;

  constructor(
    public caffeineService: CaffeineService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCaffeineDays();

    this.caffeineForm = this.fb.group({
      caffeine: ['', Validators.required],
      date: [
        '',
        (control: AbstractControl) => {
          const value = control.value;

          if (!value) {
            return null;
          }

          const hours = value.getHours();
          const minutes = value.getMinutes();
          const currentTime = new Date(Date.now());

          if (hours > currentTime.getHours()) {
            return { outOfRange: true };
          } else if (
            hours >= currentTime.getHours() &&
            minutes > currentTime.getMinutes()
          ) {
            return { outOfRange: true };
          }

          return null;
        },
      ],
    });
  }

  addCaffeine(caffeine: Caffeine) {
    this.caffeineService.addCaffeine(caffeine);
    this.getCaffeineDays();
  }

  getCaffeineDays() {
    this.caffeineByDay = this.caffeineService.getCaffeineDays();
  }
}
