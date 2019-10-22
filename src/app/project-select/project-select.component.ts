import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css']
})
export class ProjectSelectComponent implements OnInit {

  tagsArray: string[];
  selectedTags: string[] = [];
  showDropdown = false;

  onChange = () => {
    this.projectsService.selectedTags.next(this.selectedTags);
  }

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.getTags()
    .subscribe(
      res => {
        this.tagsArray = res;
      }
    );
    this.projectsService.selectedTags.subscribe( data => {
      if(this.selectedTags !== data) {
        this.selectedTags = data;
      }
    });
  }

}
