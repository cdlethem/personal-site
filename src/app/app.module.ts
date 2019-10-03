import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectComponent } from './project/project.component';
import { ExperiencePageComponent } from './experience-page/experience-page.component';
import { EducationPageComponent } from './education-page/education-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CircularPackingComponent } from './circular-packing/circular-packing.component';
import { D3Service } from 'd3-ng2-service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    ProjectPageComponent,
    ProjectComponent,
    ExperiencePageComponent,
    EducationPageComponent,
    SkillsPageComponent,
    ContactPageComponent,
    CircularPackingComponent
  ],
  imports: [
    BrowserModule,
    AngularFullpageModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
