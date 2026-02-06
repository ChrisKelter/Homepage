import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../content/contact/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public send(message: Message): Observable<boolean> {
    return this.http.post<boolean>('send_message.php', message);
  }
}
