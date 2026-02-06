import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SkillsService} from "../../service/skills.service";
import {Skills} from "./skill";
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    NgForOf,
    MatChipSet,
    MatChip
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: Skills[] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.skillsService.load().subscribe(data => this.skills = data);
  }
}
