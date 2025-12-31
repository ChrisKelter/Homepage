import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(@Inject(LOCALE_ID) public locale: string,
              private http: HttpClient) { }

  load(): Observable<any> {
    const lang = this.locale === 'de' ? 'de' : 'en';
    return this.http.get('assets/data/skills.' + lang  + '.json');
  }
}
