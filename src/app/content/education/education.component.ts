import {Component, OnInit} from '@angular/core';
import {TimelineComponent} from "../../timeline/timeline.component";
import {EducationService} from "../../service/education.service";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    TimelineComponent
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  education = [];
  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.educationService.load().subscribe(data => this.education = data);
  }
}
