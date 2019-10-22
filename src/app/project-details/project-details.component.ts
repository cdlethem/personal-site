import { Component, ViewChild } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Project } from '../project.model';
import { CarouselComponent } from 'ngx-carousel-lib';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

export interface ProjectDetailsModal {
  project: Project;
};

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})

export class ProjectDetailsComponent extends SimpleModalComponent<ProjectDetailsModal, null> implements ProjectDetailsModal {
  project: Project;

  @ViewChild('modalCarousel', {static: false}) modalCarousel: CarouselComponent;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;

  onNextSlide() {
    this.modalCarousel.slideNext();
  }

  onPrevSlide() {
    this.modalCarousel.slidePrev();
  }

  constructor() {
    super();
   }

}
