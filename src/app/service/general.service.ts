import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skills} from "../content/skills/skill";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(@Inject(LOCALE_ID) public locale: string,
              private http: HttpClient) { }

  public loadProjects(): Observable<Project[]> {
    const lang = this.locale === 'de' ? 'de' : 'en';
    return this.http.get<Project[]>('data/projects.' + lang  + '.json');
  }
}
