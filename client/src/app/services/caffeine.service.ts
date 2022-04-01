import { Caffeine } from './../models/caffeine';
import { Injectable } from '@angular/core';
import { Day } from '../models/day';

@Injectable({
  providedIn: 'root',
})
export class CaffeineService {
  caffeineByDay: Day[] = [];
  caffeineInSystem: number = 0;
  CAFFEINE_DECAY_RATE = 5;

  constructor() {}
  /**
   * Adds a new caffeine object to the user.
   *
   * @param {Caffeine} caffeine - a Caffeine object
   * @memberof CaffeineService
   */
  addCaffeine(caffeine: Caffeine) {
    if (!caffeine.date) {
      caffeine.date = new Date(Date.now());
    }

    let newDate = {
      date:
        caffeine.date.getMonth() +
        1 +
        '-' +
        caffeine.date.getDate() +
        '-' +
        caffeine.date.getFullYear(),
      caffeine: [],
    };

    let dateIndex = this.caffeineByDay.findIndex(
      (day) => day.date == newDate.date
    );

    if (dateIndex >= 0) {
      let insertIndex = this.caffeineByDay[dateIndex].caffeine.findIndex(
        (caff) => caff.date < caffeine.date
      );
      if (insertIndex === -1) {
        this.caffeineByDay[dateIndex].caffeine.push(caffeine);
      } else {
        this.caffeineByDay[dateIndex].caffeine.splice(insertIndex, 0, caffeine);
      }
    } else {
      this.caffeineByDay.unshift({ ...newDate, caffeine: [caffeine] });
    }

    this.caffeineInSystem = this.calculateInSystem();
  }

  removeCaffeine(caffeine: Caffeine): void {
    let newDate =
      caffeine.date.getMonth() +
      1 +
      '-' +
      caffeine.date.getDate() +
      '-' +
      caffeine.date.getFullYear();

    let dayIndex = this.caffeineByDay.findIndex((day) => day.date === newDate);

    if (dayIndex >= 0) {
      this.caffeineByDay[dayIndex].caffeine.splice(
        this.caffeineByDay[dayIndex].caffeine.findIndex(
          (caf) => caf === caffeine
        ),
        1
      );
      if (this.caffeineByDay[dayIndex].caffeine.length === 0) {
        this.caffeineByDay.splice(dayIndex, 1);
      }
    }
    this.caffeineInSystem = this.calculateInSystem();
  }

  setCaffeineDays(caffeineDays: Day[]) {
    caffeineDays.forEach((day) => {
      day.caffeine.forEach((caffeine) => {
        caffeine.date = new Date(caffeine.date);
      });
    });

    // sorting the days and the caffeine for each day by date and time
    caffeineDays.sort(
      (a: Day, b: Day) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    caffeineDays.forEach((day) => {
      day.caffeine.sort(
        (a: Caffeine, b: Caffeine) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    this.caffeineByDay = caffeineDays;
  }

  /**
   *
   *
   * @return {*} - array of days where caffeine has been consumed
   * @memberof CaffeineService
   */
  getCaffeineDays(): Day[] {
    return this.caffeineByDay;
  }

  /**
   * Calculate the amount of caffeine in the users system now.
   * Optionally, a parameter can be specified with a future date to get the amount of caffeine at that point in time.
   * @param {Date} [time] - An optional time
   * @return {*}  amount of caffeine in the users system
   * @memberof CaffeineService
   */
  calculateInSystem(time?: Date): number {
    let compareTime = time?.getTime() || Date.now();
    let amountCaffeine = 0;

    this.caffeineByDay.forEach((day) => {
      day.caffeine.forEach((caffeine) => {
        let timeSinceDrank =
          (compareTime - caffeine.date.getTime()) / 1000 / 60 / 60;

        amountCaffeine +=
          caffeine.caffeine *
          Math.pow(0.5, timeSinceDrank / this.CAFFEINE_DECAY_RATE);
      });
    });

    localStorage.setItem('caffeine-data', JSON.stringify(this.caffeineByDay));

    return amountCaffeine;
  }

  getCaffeineToday() {
    let day = new Date(Date.now());
    let today =
      day.getMonth() + 1 + '-' + day.getDate() + '-' + day.getFullYear();
    let caffeine = 0;

    this.caffeineByDay.forEach((day) => {
      if (day.date === today) {
        day.caffeine.forEach((caff) => {
          caffeine += caff.caffeine;
        });
      }
    });

    return caffeine;
  }
}
