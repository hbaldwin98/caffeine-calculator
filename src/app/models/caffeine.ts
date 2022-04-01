export interface ICaffeine {
  name: string;
  caffeine: number;
  date: Date;
}

export class Caffeine implements ICaffeine {
  name: string;
  caffeine: number;
  date: Date;

  constructor(caffeine: number, name?: string, date?: Date) {
    this.name = name || "Caffeinated Beverage";
    this.caffeine = caffeine;
    this.date = date || new Date(Date.now());
  }
}
