import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {InterestsService} from "../../service/interests.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf
  ],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent implements OnInit {
  interests: any[] = [];

  constructor(private interestsService: InterestsService) { }

  ngOnInit(): void {
    this.interestsService.load().subscribe(data => this.interests = data);
  }

}
