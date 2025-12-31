import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Timeline} from './timeline';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  animations: [
    trigger('timelineAnimation', [
      transition('* => *', [
        query(':enter',
          [
            style({ opacity: 0, height: 0 }),
            stagger('120ms',
              animate('1.5s ease-out', style({ opacity: 1, height : '*' }))
            )],
          { optional: true }
        )
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {
  @Input() data: Timeline[];
  outputData = new Array<Timeline>();


  constructor() { }

  ngOnInit(): void {
  }

  isMobile(): boolean {
    return window.matchMedia('screen and (max-width: 1100px)').matches;
  }

  inViewport(): boolean {
    const el = document.getElementById('timelineContent');
    const bounding = el.getBoundingClientRect();


    if (bounding.top >= 0 && bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('document:scroll', ['$event'])
  onWindowScroll($event): any {
    if (this.inViewport() && this.outputData.length === 0) {
      this.outputData = this.data;
    }
  }

}
