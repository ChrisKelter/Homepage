import {Component, OnInit} from '@angular/core';
import {TimelineComponent} from "../../timeline/timeline.component";
import {ExperienceService} from "../../service/experience.service";

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    TimelineComponent
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experience = [];

  constructor(private experienceService: ExperienceService) { }

  ngOnInit(): void {
    this.experienceService.load().subscribe(data => this.experience = data);
  }
}
