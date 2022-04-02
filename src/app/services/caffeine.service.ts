import { Caffeine } from './../models/caffeine';
import { Injectable } from '@angular/core';
import { Day } from '../models/day';
import { TypeaheadOptions } from 'ngx-bootstrap/typeahead';

@Injectable({
  providedIn: 'root',
})
export class CaffeineService {
  caffeineByDay: Day[] = [];
  caffeineInSystem: number = 0;
  caffeineHalfLife = 5;

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
      date: this.getDateString(),
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
    let newDate = this.getDateString();

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
          Math.pow(0.5, timeSinceDrank / this.caffeineHalfLife);
      });
    });

    localStorage.setItem('caffeine-data', JSON.stringify(this.caffeineByDay));

    return amountCaffeine;
  }

  getCaffeineToday() {
    let today = this.getDateString()
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

  getCaffeineLast7Days(): Day[] {
    let days: any = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(Date.now());
      let caffeine = 0;
      date.setDate(date.getDate() - i);
      let newDate =
        date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
      let dayIndex = this.caffeineByDay.findIndex((day) => day.date === newDate);

      if (dayIndex >= 0) {
        this.caffeineByDay[dayIndex].caffeine.forEach((caff) => {
          caffeine += caff.caffeine;
        });
        days.push({date: this.caffeineByDay[dayIndex].date, caffeine: caffeine });
      } else {
        days.push({ date: newDate, caffeine: 0 });
      }
    }
    days.reverse();
    return days;
  }

  getDrinksToday() {
    let todayIndex = this.caffeineByDay.findIndex(day => day.date === this.getDateString());

    if (todayIndex >= 0) {
      return this.caffeineByDay[todayIndex].caffeine;
    } else {
      return [];
    }
  }

  getDateString() {
    let date = new Date(Date.now());
    let dateString =
        date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();

    return dateString;
  }
}
