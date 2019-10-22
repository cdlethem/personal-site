import {Component, OnInit, ElementRef, OnDestroy, Input, ViewEncapsulation, HostListener } from '@angular/core';
import {D3Service, D3, Selection} from 'd3-ng2-service';
import {HierarchyPointNode, HierarchyNode} from 'd3-hierarchy';
import {Observable, Subject} from 'rxjs';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-circle-packing-renderer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './circle-packing-renderer.component.html',
  styleUrls: ['./circle-packing-renderer.component.css']
})
export class CirclePackingRendererComponent implements OnInit, OnDestroy {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private clickedNode: Subject<string>;
  private goToProjects: Subject<boolean>;

  @Input() root: Observable<HierarchyNode<any>>;
  @Input() svgHeight: number;
  @Input() svgWidth: number;
  data: any;
  color: (number) => string;
  format: any;
  processData: any;

  constructor(element: ElementRef, d3Service: D3Service, private projectsService: ProjectsService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }




  ngOnDestroy(): void {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }

  ngOnInit() {

    const d3 = this.d3;

    const hovered = (hover) => {
      return (d) => {
        d3.selectAll(d.ancestors().map(d => d.node)).classed('node--hover', hover);
      };
    }

    if (this.parentNativeElement == null) {
      return;
    }

    const d3ParentElement: Selection<HTMLElement, any, null, undefined> = d3.select(this.parentNativeElement);
    const d3Svg: Selection<SVGSVGElement, any, null, undefined> = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');


    const format = this.format = d3.format(',d');
    const color: (number) => string = this.color = d3.scaleSequential(d3.interpolateBlues).domain([-4, 4]);

    const processData = this.processData = (root: HierarchyNode<any>) => {
      d3.pack()
      .size([this.svgWidth - 2, this.svgHeight - 2])
      .padding(3)(root);

      const node = d3Svg.select<SVGGElement>('g')
        .selectAll('g')
        .data(root.descendants())
        .enter().append('g')
        .attr('transform', (d: HierarchyPointNode<any>) => 'translate(' + d.x + ',' + d.y + ')')
        .attr('class', d => 'node' + (!d.children ? ' node--leaf' : d.depth ? '' : ' node--root'))
        .each(function(d) {
          ( d as any).node = this;
        })
        .on('mouseover', hovered(true))
        .on('mouseout', hovered(false))
        .on('click', (d) => {
          if(d.data.name === "All") {
            this.projectsService.getTags().subscribe( tags => {
              this.projectsService.selectedTags.next(tags);
              this.projectsService.goToProjects.next(true);
            })
          } else {
            this.projectsService.selectedTags.next([d.data.name]);
            this.projectsService.goToProjects.next(true);
          }
        });
      node.append("a")
        .attr('href','#')
        .append<SVGCircleElement>('circle')
        .attr('id', d => {
          return 'node-' + d.data.name;
        })
        .attr('r', d => ( d as any).r)
        .style('fill', d => color(d.depth));

      const leaf = node.filter(d => !d.children);

      leaf.append('clipPath')
        .attr('id', d => 'clip-' + d.data.name )
        .append('use')
        .attr('xlink:href', d => '#node-' + d.data.name + '');

      leaf.append('text')
        .attr('clip-path', d => 'url(#clip-' + d.data.name + ')')
        .selectAll('tspan')
        .data((d: HierarchyNode<any>) => {
          return d.data.name.substring(d.data.name.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g);
        })
        .enter().append('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
        .text(d => '' + d);

      node.append('title')
        .text(d => d.data.name + '\n' + format(d.value));
    };

    this.root.subscribe(root => {
      this.data = root;
      processData(root);
    });

  }

  @HostListener('redraw', ['$event'])
  reDraw(event?) {
    console.log(this.data);
    this.processData(this.data);
  }

}
