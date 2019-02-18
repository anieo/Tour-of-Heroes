import { Injectable } from '@angular/core'
import { Hero } from '../../hero'
import { HEROES } from '../../mock-heroes'
import { observable, of, Observable } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes():Observable<Hero[]>{
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }
}
