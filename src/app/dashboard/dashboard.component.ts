import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { finalize, fromEvent, Subscription } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  private mousemoveSubscription!: Subscription;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.mousemoveSubscription = fromEvent(document, 'mousemove')
      .subscribe(() => console.log('mousemove'));
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
