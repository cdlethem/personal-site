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
        query(".icon-item", [
          style({ opacity: 0, transform: "translateY(-100px)" }),
          stagger(500, [
            animate(
              "750ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ]),
    trigger("pageAnimations", [
      transition(":leave", [
        style({ opacity: 1, transform: "none" }),
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger("contentArea", [
      transition(":enter", [
          style({ opacity: 0}),
            animate(1500, style({ opacity: 1}))
        ])
    ]),
    trigger("fadeInOut", [
      state(
        "0",
        style({
          opacity: 0,
          fontSize: "2vw",
          lineHeight: "2vw"
        })
      ),
      state(
        "1",
        style({
          opacity: 1,
          fontSize: "8vw",
          lineHeight: "7vw"
        })
      ),
      state(
        "2",
        style({
          opacity: 0,
          fontSize: "2vw",
          lineHeight: "7vw"
        })
      ),
      transition("0 => 1", animate(800)),
      transition("1 => 2", animate(800)),
      transition(
        "* => void",
        animate(1000, style({ opacity: 0}))
      )
    ]),
    trigger("fadeInStay", [
      state(
        "0",
        style({
          opacity: 0,
          fontSize: "2vw",
          lineHeight: "2vw"
        })
      ),
      state(
        "1",
        style({
          opacity: 1,
          fontSize: "8vw",
          lineHeight: "7vw"
        })
      ),
      transition("0 => 1", animate(800)),
      transition(
        "* => void",
        animate(1000, style({ opacity: 0 }))
      )
    ]),
    trigger("fadeInLate", [
      state(
        "0",
        style({
          opacity: 0,
          fontSize: "2vw",
          lineHeight: "2vw"
        })
      ),
      state(
        "1",
        style({
          opacity: 0
        })
      ),
      state(
        "2",
        style({
          opacity: 1,
          fontSize: "8vw",
          lineHeight: "7vw"
        })
      ),
      transition("1 => 2", animate(1600)),
      transition(
        "* => void",
        animate(1000, style({ opacity: 0 }))
      )
    ])
  ]
})
export class AboutPageComponent implements OnInit {
  @HostBinding("@pageAnimations")
  public animatePage = true;

  @Input() animationStep = 0;

  constructor() {}

  ngOnInit() {}
}
