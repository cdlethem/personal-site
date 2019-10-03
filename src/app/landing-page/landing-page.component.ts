import { Component, OnInit } from '@angular/core';
import { faCode, faProjectDiagram, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  faCode = faCode;
  faProjectDiagram = faProjectDiagram;
  faArrowAltCircleDown = faArrowAltCircleDown;

  ngOnInit() {
  }
}
