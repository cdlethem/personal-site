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
  aboutPageLoaded = 0;
  skillsPageLoaded = 0;
  projectsPageLoaded = 0;

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
        "about",
        "portfolio",
        "education",
        "contact"
      ],
      menu: "#menu",
      navigation: false,
      navigationPosition: "right",
      navigationTooltips: [
        "Home",
        "About Me",
        "Portfolio",
        // "Projects",
        "Education",
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

        if (destination.anchor === "about") {
          this.aboutPageLoaded = 1;
        }

        if (destination.anchor === "portfolio") {
          this.skillsPageLoaded = 1;
        }
      },
      afterSlideLoad: (section, origin, destination, direction) => {
        if (section.anchor === "portfolio" && destination.index === 0) {
          this.skillsPageLoaded = 1;
        }

        if(section.anchor === "portfolio" && destination.index === 1) {
          this.projectsPageLoaded = 1;
        }
      },
      onSlideLeave: (section, origin, destination, direction) => {
        if (section.anchor === "portfolio" && origin.index === 0) {
          this.skillsPageLoaded = 0;
        }

        if (section.anchor === "portfolio" && origin.index === 1) {
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

        if (origin.anchor === "portfolio") {
          this.skillsPageLoaded = 0;
        }

        if (origin.anchor === "about") {
          this.aboutPageLoaded = 0;
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
      },150)
    })
  }

}
