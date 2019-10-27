import { Component, OnInit, Input, HostBinding } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  sequence
} from "@angular/animations";

@Component({
  selector: "app-about-page",
  templateUrl: "./about-page.component.html",
  styleUrls: ["./about-page.component.css"],
  animations: [
    trigger("iconItemAnimation", [
      transition(":enter", [
        query(".icon-wrapper", [
          style({ opacity: 0, transform: "translateY(-100px)" }),
          stagger(500, [
            animate(
              "750ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})

export class AboutPageComponent implements OnInit {

  @Input("aboutPageLoaded")
  loaded: number;

  constructor() { }

  ngOnInit() { }
}
