import { BsModalRef } from 'ngx-bootstrap/modal';
import { Caffeine } from './../models/caffeine';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CaffeineService } from '../services/caffeine.service';

@Component({
  selector: 'app-add-caffeine',
  templateUrl: './add-caffeine.component.html',
  styleUrls: ['./add-caffeine.component.sass'],
})
export class AddCaffeineComponent implements OnInit {
  options!: any[];
  drinkType = 'select';
  caffeineForm!: FormGroup;
  selectedOption!: number;

  constructor(
    private fb: FormBuilder,
    public caffeineService: CaffeineService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.populateOptions();

    this.caffeineForm = this.fb.group({
      name: [''],
      caffeine: ['', Validators.required],
      date: [
        '',
        (control: AbstractControl) => {
          const value = control.value;

          console.log(value);
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

  populateOptions() {
    this.options = [
      {
        caffeine: 96,
        name: '8oz Coffee',
      },
      {
        caffeine: 144,
        name: '12oz Coffee',
      },
      {
        caffeine: 192,
        name: '16oz Coffee',
      },
      {
        caffeine: 240,
        name: '20oz Coffee',
      },
      {
        caffeine: 64,
        name: '1oz Espresso',
      },
      {
        caffeine: 128,
        name: '2oz Espresso',
      },
      {
        caffeine: 47,
        name: '8oz Black Tea',
      },
      {
        caffeine: 28,
        name: '8oz Green Tea',
      },
    ];
  }

  addCaffeine(caffeine: Caffeine) {
    this.caffeineService.addCaffeine(caffeine);
    this.bsModalRef.hide();
  }

  addCaffeineFromOptions(index: number) {
    this.caffeineService.addCaffeine(this.options[index]);
    this.bsModalRef.hide();
  }
}
