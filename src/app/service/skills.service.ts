import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skills} from "../content/skills/skill";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(@Inject(LOCALE_ID) public locale: string,
              private http: HttpClient) { }

  load(): Observable<Skills[]> {
    const lang = this.locale === 'de' ? 'de' : 'en';
    return this.http.get<Skills[]>('data/skills.' + lang  + '.json');
  }
}
