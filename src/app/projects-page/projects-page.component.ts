import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { trigger, transition, query, style, animate, state, stagger } from '@angular/animations';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
  animations: [
    trigger('projectAnimation', [
      transition(':enter', [
        query(".item-col", [
        style({ opacity: 0, transform: "translateY(100px)" }),
        stagger(500, [
          animate("500ms linear",
            style({ opacity: 1, transform: "none" })
            )
          ])
      ])
    ]),
      transition('* => void', [
        style({ opacity: 1, transform: "none" }),
        animate("500ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({ opacity: 0, transform: "translateY(100px)" }))
      ])
    ])
    // trigger('animationTop', [
    //   state("0",
    //     style({
    //       opacity: 0,
    //       transform: "translateY(-150px)"
    //     })),
    //   state("1",
    //     style({
    //       opacity: 1,
    //       transform: "none"
    //     })),
    //   transition("0 => 1",
    //     animate("750ms cubic-bezier(0.35, 0, 0.25, 1)"))
    // ])
  ]
})
export class ProjectsPageComponent implements OnInit {
  showDropdown = false;
  loadedProjects: Project[] = [];
  selectedTags: string[] = [];
  @Input("projectsPageLoaded")
  loaded: number;

  @ViewChildren('outputProjects') projects: QueryList<any>;

  ngAfterViewInit() {
    this.projects.changes.subscribe(t => {
      this.projectsService.triggerRebuild.next(true);
    })
  };

  onTagsChange(event: string[]) {
    this.projectsService.selectedTags.next(event);
  }

  onClickSeeAll = () => {
    this.projectsService.getTags().subscribe(data => {

      this.projectsService.selectedTags.next(data);
    });
  };
  onClear = () => {
    this.projectsService.selectedTags.next([])
  }

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {

    this.projectsService.getProjects().subscribe(
      projects => {
        this.loadedProjects = projects;
      }
    );

    this.projectsService.selectedTags.subscribe(data => {
      this.selectedTags = data;
    });

    setTimeout(() => {
      this.showDropdown = true;
    }, 1);

  }

}
