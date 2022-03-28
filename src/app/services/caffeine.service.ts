import { Caffeine } from './../models/caffeine';
import { Injectable } from '@angular/core';
import { Day } from '../models/day';

@Injectable({
  providedIn: 'root',
})
export class CaffeineService {
  caffeineByDay: Day[] = [];
  public caffeineInSystem: number = 0;
  CAFFEINE_DECAY_RATE = 6;

  constructor() {}

  /**
   * Adds a new caffeine object to the user.
   *
   * @param {Caffeine} caffeine - a Caffeine object
   * @memberof CaffeineService
   */
  addCaffeine(caffeine: Caffeine) {
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
      this.caffeineByDay[dateIndex].caffeine.push(caffeine);
    } else {
      this.caffeineByDay.push({ ...newDate, caffeine: [caffeine] });
    }

    console.log(this.caffeineByDay);
    this.caffeineInSystem = this.calculateInSystem();
  }

  /**
   *
   *
   * @return {*} - array of days where caffeine has been consumed
   * @memberof CaffeineService
   */
  getCaffeineDays() {
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
          caffeine.caffeine * Math.pow(0.5, timeSinceDrank / this.CAFFEINE_DECAY_RATE);
      });
    });

    return amountCaffeine;
  }
}
