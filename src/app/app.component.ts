import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sideNav;
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

    this.languageMenu.current = locale.toUpperCase();
    this.languageMenu.options.push(locale === 'de' ? 'en' : 'de');
  }

  ngOnInit(): void {
  }

  scroll(el): void {
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  scrollMobile(el): void {
    this.sideNav.toggle();
    this.scroll(el);
  }
}
