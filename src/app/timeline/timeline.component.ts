import {Component, Input} from '@angular/core';
import {Timeline} from "./timeline";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent{
  @Input() data?: Timeline[];

  constructor() { }
}
