import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-money-transfer-hero-section',
  standalone: true,
  templateUrl: './money-transfer-hero-section.component.html',
  styleUrls: ['./money-transfer-hero-section.component.scss'],
})
export class MoneyTransferHeroSectionComponent implements OnInit, OnDestroy {
  currentRoute: string = '';
  pageTitle: string = 'Money Transfer';
  private sub!: Subscription;

  constructor(private router: Router) {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.updateCurrentRoute(this.router.url);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateCurrentRoute(url: string): void {
    const routeSegments = url.split('/');
    this.currentRoute = routeSegments[routeSegments.length - 1].replace('-', ' ');

    if (url.includes('help')) {
      this.pageTitle = 'Help';
    } else if (url.includes('myAccount')) {
      this.pageTitle = 'My Account';
    } else if (url.includes('404')) {
      this.pageTitle = 'Error';
    } else {
      this.pageTitle = 'Money Transfer';
    }
  }
}