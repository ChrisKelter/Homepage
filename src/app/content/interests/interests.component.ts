import { Component, OnInit } from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {InterestsService} from './interests.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css'],
})
export class InterestsComponent implements OnInit {
  interests = [];

  constructor(private interestsService: InterestsService) { }

  ngOnInit(): void {
    this.interestsService.load().subscribe(data => this.interests = data);
  }

}
