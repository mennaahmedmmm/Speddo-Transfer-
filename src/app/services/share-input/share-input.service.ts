import { Injectable, input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareInputService {
  private inputFrom: number = 1;
  private inputTo: number = 1;
  private selectedCurrency = {
    codeFrom: 'EGP',
    rateFrom: 1,
    codeTo: 'EGP',
    rateTo: this.inputFrom,
    // flagFrom: 'assets/united states.svg',
    // flagTo: 'assets/united states.svg',
  };
  set(from: number, to: number, obj: any) {
    this.inputFrom = from;
    this.inputTo = to;
    this.selectedCurrency = obj;
  }
  getFrom(): number {
    return this.inputFrom;
  }
  getTo(): number {
    return this.inputTo;
  }
  getCurrency() {
    return this.selectedCurrency;
  }
}
