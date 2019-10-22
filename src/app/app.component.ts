import { Component, OnInit } from "@angular/core";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { ProjectsService } from './projects.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "personal-site";
  config: any;
  fullpage_api: any;
  showMenu = false;
  showDownArrow = false;
  delayOver = false;
  activeAnchor: string;
  faChevronCircleDown = faChevronCircleDown;
  animationStep: number;
  animateAboutPage = true;
  skillsPageLoaded = 0;
  projectsPageLoaded = 0;

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
  }

  handleMoveDown = (event) => {
    if(event) {
      this.fullpage_api.moveSectionDown();
    }
  }

  

  constructor(private projectsService: ProjectsService) {
    this.config = {
      // fullpage options
      anchors: [
        "home",
        "aboutPage",
        "skillsPage",
        // "projectsPage",
        "experiencePage",
        "contactPage"
      ],
      menu: "#menu",
      navigation: false,
      navigationPosition: "right",
      navigationTooltips: [
        "Home",
        "About Me",
        "Skills",
        // "Projects",
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
      fitToSection: true,
      fitToSectionDelay: 200,
      scrollBar: false,
      easing: "easeInOutCubic",
      easingcss3: "ease",
      loopBottom: false,
      loopTop: false,
      loopHorizontal: false,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: true,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: false,
      normalScrollElements: '.itemsBlock, .ng-dropdown-panel, .ng-select, .modal, .modal-content',
      scrollOverflow: true,
      scrollOverflowReset: false,
      scrollOverflowOptions: null,
      touchSensitivity: 15,
      bigSectionsDestination: null,

      // Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      // Design
      controlArrows: true,
      verticalCentered: false,
      // sectionsColor : ['#ccc', '#fff'],
      paddingTop: "2em",
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

        if (destination.anchor === "aboutPage" && this.animateAboutPage) {
          this.incrementAnimationStep([200, 1500, 1500, 500, 1000]);
          this.animateAboutPage = false;
        }

        if (destination.anchor === "skillsPage") {
          this.skillsPageLoaded = 1;
        }
      },
      afterSlideLoad: (section, origin, destination, direction) => {
        if (section.anchor === "skillsPage" && destination.index === 0) {
          this.skillsPageLoaded = 1;
        }

        if(section.anchor === "skillsPage" && destination.index === 1) {
          this.projectsPageLoaded = 1;
        }
      },
      onSlideLeave: (section, origin, destination, direction) => {
        if (section.anchor === "skillsPage" && origin.index === 0) {
          this.skillsPageLoaded = 0;
        }

        if (section.anchor === "skillsPage" && origin.index === 1) {
          this.projectsPageLoaded = 0;
        }
      },
      onLeave: (origin, destination, direction) => {
        // this.animationStep = 0;
        // this.delayOver = false;
        this.activeAnchor = destination.anchor;

        if (!destination.isFirst) {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }

        if (origin.anchor === "skillsPage") {
          this.skillsPageLoaded = 0;
        }
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit() {
    this.projectsService.goToProjects.subscribe( data => {
      if (data) {
        this.fullpage_api.moveSlideRight();
        this.projectsService.goToProjects.next(false);
      }
    });

    this.projectsService.triggerRebuild.subscribe( data => {
      setTimeout(()=>{
        if (data) {
          this.fullpage_api.reBuild();
          console.log("rebuilt")
          this.projectsService.triggerRebuild.next(false);
        }
      },1500)
    })
  }

}
