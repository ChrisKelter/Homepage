import { Component } from '@angular/core';
import {MatList, MatListItem, MatListModule} from "@angular/material/list";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatIconButton} from "@angular/material/button";
import {Data} from "../../data";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatLine,
    MatIconButton
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  data: Data = new Data();
}
