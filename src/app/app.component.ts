import {Component, Inject, LOCALE_ID, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer
} from "@angular/material/sidenav";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {DomSanitizer} from "@angular/platform-browser";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {AboutComponent} from "./content/about/about.component";
import {ExperienceComponent} from "./content/experience/experience.component";
import {EducationComponent} from "./content/education/education.component";
import {SkillsComponent} from "./content/skills/skills.component";
import {InterestsComponent} from "./content/interests/interests.component";
import {ContactComponent} from "./content/contact/contact.component";
import {provideHttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatSidenavContainer, MatMenu, MatMenuTrigger, MatNavList, MatToolbar, MatDrawer, MatDrawerContent, MatDrawerContainer, MatButton, MatListItem, MatIconButton, MatMenuItem, NgForOf, AboutComponent, ExperienceComponent, EducationComponent, SkillsComponent, InterestsComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [

  ]
})
export class AppComponent {
  @ViewChild('sidenav') sideNav?:MatDrawer;
  languageMenu = {
    current: '',
    options: []
  };


  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              @Inject(LOCALE_ID) public locale: string) {
    this.matIconRegistry.addSvgIcon(
      'instagram',
      '');

    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/linkedin-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'xing',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/xing-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github-icon.svg')
    );

    this.languageMenu.current = locale.toUpperCase();
    // @ts-ignore
    this.languageMenu.options.push((locale === 'de' )? 'en' : 'de');
  }

  ngOnInit(): void {
  }

  scroll(el: any): void {
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  scrollMobile(el: any): void {
    this.sideNav?.toggle();
    this.scroll(el);
  }
}
