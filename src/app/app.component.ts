import { Component } from "@angular/core";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "personal-site";
  config: any;
  fullpage_api: any;
  showMenu = false;
  showDownArrow = false;
  delayOver = false;
  activeAnchor: string;
  faChevronCircleDown = faChevronCircleDown;
  animationStep: number;

  incrementAnimationStep = (
    stepsArray: number[] = [],
    evenSteps: boolean = false,
    evenStepLength: number = 1000,
    maxSteps: number = 1
  ) => {
    let i = 0;

    const unevenTimeout = (steps: number[]) => {
      const doNext = () => {

        if (i >= steps.length + 1) {
          return;
        }
        this.animationStep = i;
        console.log(this.animationStep)
        setTimeout(doNext, steps[i]);
        i++;
      };
      doNext();
    };

    if (evenSteps) {
      setInterval(() => {
        if (this.animationStep < maxSteps) {
          this.animationStep += 1;
        } else {
          return;
        }
      }, evenStepLength);
    } else {
      unevenTimeout(stepsArray);
    }
  };

  moveDown = () => {
    this.fullpage_api.moveSectionDown();
  };

  constructor() {
    this.config = {
      // fullpage options
      anchors: [
        "home",
        "aboutPage",
        "skillsPage",
        "educationPage",
        "projectsPage",
        "experiencePage",
        "contactPage"
      ],
      menu: "#menu",
      navigation: true,
      navigationPosition: "right",
      navigationTooltips: [
        "Home",
        "About Me",
        "Skills",
        "Education",
        "Projects",
        "Experience",
        "Contact"
      ],
      showActiveTooltip: true,
      slidesNavigation: true,
      slidesNavPosition: "bottom",

      // Scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: false,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: "easeInOutCubic",
      easingcss3: "ease",
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: true,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: false,
      // normalScrollElements: '#element1, .element2',
      scrollOverflow: false,
      scrollOverflowReset: false,
      scrollOverflowOptions: null,
      touchSensitivity: 15,
      bigSectionsDestination: null,

      // Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      // Design
      controlArrows: false,
      verticalCentered: true,
      // sectionsColor : ['#ccc', '#fff'],
      paddingTop: "3em",
      paddingBottom: "0px",
      // fixedElements: '#header, .footer',
      responsiveWidth: 0,
      responsiveHeight: 0,
      responsiveSlides: true,
      parallax: false,
      parallaxOptions: {
        type: "reveal",
        percentage: 62,
        property: "translate"
      },
      cards: false,
      cardsOptions: {
        perspective: 100,
        fadeContent: true,
        fadeBackground: true
      },

      // Custom selectors
      sectionSelector: ".section",
      slideSelector: ".slide",

      lazyLoading: false,
      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin, destination, direction) => {

        if (destination.isFirst) {
          this.showMenu = false;
          setTimeout(() => {
            this.delayOver = true;
          }, 1500);
        }

        if (destination.anchor === "aboutPage") {
          this.incrementAnimationStep([200, 1500, 1500, 500, 1000]);
        }
      },
      onLeave: (origin, destination, direction) => {
        this.animationStep = 0;
        this.delayOver = false;
        this.activeAnchor = destination.anchor;

        if (!destination.isFirst) {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }
}
