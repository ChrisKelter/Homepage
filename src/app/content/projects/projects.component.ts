import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {GeneralService} from "../../service/general.service";
import {Project} from "../../model/project";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatChip, MatChipListbox, MatChipsModule} from "@angular/material/chips";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-projects',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatLine,
        MatList,
        MatListItem,
        MatListItemIcon,
        MatListItemTitle,
        FormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatCardModule,
        MatChipsModule,
        MatPaginatorModule
    ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
    constructor(private generalService: GeneralService) {
    }
    projects: Project[] = []
    pageSize: number = 2
    currentProjects: Project[] = []

    ngOnInit(): void {
        this.generalService.loadProjects().subscribe(data => {
            this.projects = data
            this.currentProjects = this.determineCurrentProjects(0)
        });
    }

    handlePageEvent(e: PageEvent) {
        this.currentProjects = this.determineCurrentProjects(e.pageIndex)
        console.log(this.currentProjects)
    }

    private getProjectIndex(pageIndex: number): number {
        return pageIndex * this.pageSize;
    }

    private determineCurrentProjects(pageIndex: number): Project[] {
        const startIndex = this.getProjectIndex(pageIndex);
        return this.projects.slice(startIndex, startIndex + this.pageSize)
    }

    get paginatorLength(): number {
        return this.projects.length / this.pageSize;
    }

}
