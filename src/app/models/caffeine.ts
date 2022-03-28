export interface ICaffeine {
  caffeine: number;
  date: Date;
}

export class Caffeine implements ICaffeine {
  caffeine: number;
  date: Date;

  constructor(caffeine: number, date: Date) {
    this.caffeine = caffeine;
    this.date = date;
  }
}
