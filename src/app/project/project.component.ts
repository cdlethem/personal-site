import { Component, Input } from '@angular/core';
import { Project } from '../project.model';
import { faExternalLinkAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SimpleModalService } from 'ngx-simple-modal';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() projectData: Project;
  faExternalLinkAlt = faExternalLinkAlt;
  faInfoCircle = faInfoCircle;

  constructor(private simpleModalService: SimpleModalService) { }
  showDetails() {
    this.simpleModalService.addModal(ProjectDetailsComponent, {
      project: this.projectData
    }).subscribe()
  }
}
