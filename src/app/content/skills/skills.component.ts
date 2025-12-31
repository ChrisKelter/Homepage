import {Component, HostListener, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {SkillsService} from './skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.skillsService.load().subscribe(data => this.skills = data);
  }
}
