import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faCode, faProjectDiagram, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  faCode = faCode;
  faProjectDiagram = faProjectDiagram;
  faChevronCircleDown = faChevronCircleDown;
  @Output()
  moveDown = new EventEmitter<boolean>()
  @Input() delayOver: boolean;

  onClick = () => {
    this.moveDown.emit(true)
  }

  ngOnInit() {
  }
}
