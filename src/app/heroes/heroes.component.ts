import { Component, OnInit } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(heroName: string): void {
    if (!heroName) {
      return;
    }
    of(this.inMemoryDataService.genId(this.heroes)).subscribe((id) =>
      this.heroService
        .addHero({ id: id, name: heroName } as Hero)
        .subscribe((hero) => this.heroes.push(hero))
    );
  }

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private inMemoryDataService: InMemoryDataService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }
}
