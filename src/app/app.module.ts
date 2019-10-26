import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service';
import { SimpleModalModule } from 'ngx-simple-modal';
import { defaultSimpleModalOptions, DefaultSimpleModalOptionConfig } from 'ngx-simple-modal/dist/simple-modal/simple-modal-options';
import { CarouselModule } from 'ngx-carousel-lib';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectComponent } from './project/project.component';
import { ExperiencePageComponent } from './experience-page/experience-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CirclePackingJsonService } from './circle-packing-json.service';
import { CirclePackingRendererComponent } from './circle-packing-renderer/circle-packing-renderer.component';
import { ProjectsFilterPipe } from './projects-filter.pipe';
import { ProjectSelectComponent } from './project-select/project-select.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    ProjectComponent,
    ExperiencePageComponent,
    SkillsPageComponent,
    ContactPageComponent,
    CirclePackingRendererComponent,
    ProjectsFilterPipe,
    ProjectSelectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFullpageModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgSelectModule,
    FormsModule,
    SimpleModalModule,
    CarouselModule,
  ],
  entryComponents: [
    ProjectDetailsComponent
  ],
  providers: [D3Service, CirclePackingJsonService,
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: { ...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true } }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
