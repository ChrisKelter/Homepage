import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AboutComponent } from './content/about/about.component';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import { ExperienceComponent } from './content/experience/experience.component';
import { EducationComponent } from './content/education/education.component';
import { SkillsComponent } from './content/skills/skills.component';
import { InterestsComponent } from './content/interests/interests.component';
import { ContactComponent } from './content/contact/contact.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import {RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module} from 'ng-recaptcha';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    InterestsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    FlexLayoutModule,
    RecaptchaV3Module,
    RecaptchaModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  exports: [
    MatSidenavModule
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdF88AZAAAAAI4uG6Y-yUvSp4VA3zxs__-SL9nA' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
