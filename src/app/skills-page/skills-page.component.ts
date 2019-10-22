import { Component, HostListener, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HierarchyNode } from 'd3-hierarchy';
import { CirclePackingJsonService } from '../circle-packing-json.service';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from '../projects.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.css'],
  animations: [
    trigger("animationTop", [
      state("0",
        style({
          opacity: 0,
          transform: "translateY(-150px)"
        })),
      state("1",
        style({
          opacity: 1,
          transform: "none"
        })),
      transition("0 => 1",
        animate("750ms cubic-bezier(0.35, 0, 0.25, 1)"))
    ]),
    trigger("animationLeft", [
      state("0",
        style({
          opacity: 0,
          transform: "translateX(-150px)"
        })),
      state("1",
        style({
          opacity: 1,
          transform: "none"
        })),
      transition("0 => 1",
        animate("750ms cubic-bezier(0.35, 0, 0.25, 1)"))
    ]),
    trigger("animationRight", [
      state("0",
        style({
          opacity: 0,
          transform: "translateX(150px)"
        })),
      state("1",
        style({
          opacity: 1,
          transform: "none"
        })),
      transition("0 => 1",
        animate("750ms cubic-bezier(0.35, 0, 0.25, 1)"))
    ])
  ]
})

export class SkillsPageComponent {

  public jsonRoot: Observable<HierarchyNode<any>>;

  constructor(private circlePackingJsonService: CirclePackingJsonService, private projectsService: ProjectsService) {
    this.jsonRoot = circlePackingJsonService.getRoot();
  }

  faAngleDoubleRight = faAngleDoubleRight;
  svgHeight: number = Math.min(Math.floor(window.innerHeight / 15) * 10, Math.round(window.innerWidth / 15) * 10);
  svgWidth: number = Math.min(Math.floor(window.innerHeight / 15) * 10, Math.round(window.innerWidth / 15) * 10);
  display = true;
  scrollRight: Subject<boolean>;
  clickedNode: Subject<string>;
  @Input("skillsPageLoaded")
  loaded: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.svgWidth = Math.min(Math.floor(window.innerHeight / 15) * 10, Math.round(window.innerWidth / 15) * 10);
    this.svgHeight = this.svgWidth;
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 1);
  }

  onClickSeeAll = () => {
    this.projectsService.getTags().subscribe(data => {

      this.projectsService.selectedTags.next(data);
    });

    this.projectsService.goToProjects.next(true);
  }

}
