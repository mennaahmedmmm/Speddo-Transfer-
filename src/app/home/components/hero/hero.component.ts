import { Component } from '@angular/core';
import { MoneyInputComponent } from '../../../shared/money-input/money-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';
import { currency } from '../../../models/currency';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareInputService } from '../../../services/share-input/share-input.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MoneyInputComponent, ButtonComponent, CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  dropdownOpenFrom = false;
  dropdownOpenTo = false;
  convertedAmount!: number;
  inputFrom: number = 1;
  selectedCurrency = {
    codeFrom: 'LE',
    rateFrom: 1,
    codeTo: 'LE',
    rateTo: 1000,
  };
  constructor(
    private readonly router: Router,
    private share: ShareInputService
  ) {
    this.convertAmount();
  }

  goTOTransfer() {
    this.share.set(this.inputFrom, this.convertedAmount, this.selectedCurrency);
    this.router.navigate(['main-page/transfer']);
  }

  toggleDropdownFrom() {
    this.dropdownOpenFrom = !this.dropdownOpenFrom;
  }

  toggleDropdownTo() {
    this.dropdownOpenTo = !this.dropdownOpenTo;
  }

  convertAmount() {
    this.convertedAmount =
      (this.inputFrom / this.selectedCurrency.rateFrom) *
      this.selectedCurrency.rateTo;
  }
  selectCurrencyFrom(currency: currency) {
    this.selectedCurrency.codeFrom = currency.currency_code;
    this.selectedCurrency.rateFrom = currency.exchange_rate;
    this.convertAmount();
  }
  selectCurrencyTo(currency: currency) {
    this.selectedCurrency.codeTo = currency.currency_code;
    this.selectedCurrency.rateTo = currency.exchange_rate;
    this.convertAmount();
  }
}
