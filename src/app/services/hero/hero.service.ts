import { Injectable } from '@angular/core'
import { Hero } from '../../hero'
import { of,  Observable } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}
  private heroUrl = 'api/heroes';

  getHeroes(): Observable < Hero[] > {
    return this.http.get < Hero[] > (this.heroUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes',[]))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(` ${operation} failed ${error.message} `);

      return of(result as T);
    }
  }
  private log(message: string) {
    this.messageService.add("HeroService: " + message);
  }
  getHero(id: number): Observable < Hero > {
    const url = `${this.heroUrl}/${id}`;  
    return this.http.get<Hero>(url)
    .pipe(
      tap(_=> this.log(`fetched Hero id=${id}`)),
      catchError(this.handleError<Hero>(`get Hero id=${id}`))
    );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('upadteHero'))
    )
  }

}
