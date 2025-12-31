import { Component, OnInit } from '@angular/core';
import {EducationService} from './education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  /*
  education = [
    {
      timeTitle: '2017-',
      timeSubtitle: 'Bachelor of Science',
      contentTitle: 'Universität Innsbruck',
      contentText: 'Das Studentenleben muss noch näher beschrieben werden'
    },
    {
      timeTitle: '2011-2016',
      timeSubtitle: 'Matura / Abitur',
      contentTitle: 'HTL Anichstraße',
      contentText: 'Ausbildung an der Abteilung Elektronik und Technische Informatik mit den Schwerpunkten: Hardware designen, Software entwickeln und Netzwerke managen.'
    },
    {
      timeTitle: '2007-2011',
      timeSubtitle: '',
      contentTitle: 'Hauptschule Söll',
      contentText: 'Erweiterte Ausbildung: Fähigkeiten wie lesen, schreiben und rechnen werden ausgebaut. Neben Deutsch wird auch Englisch unterrichtet. Im Laufe der 4 Jahre wird auch Biologie, Bildnerische Erziehung, Physik/Chemie, uvm. gelehrt.'
    },
  ];
  */
  education = [];
  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.educationService.load().subscribe(data => this.education = data);
  }

}
