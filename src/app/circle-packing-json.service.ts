import { Injectable } from '@angular/core';
import { D3, D3Service } from 'd3-ng2-service';

import { Observable } from 'rxjs';
import { HierarchyNode, HierarchyPointNode } from 'd3-hierarchy';
import { HierarchicalData } from './hierarchical-data.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CirclePackingJsonService implements HierarchicalData {
  private d3: D3;
  private url = 'flare.json';
  constructor(private http: HttpClient, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
  }

  getRoot(): Observable<HierarchyNode<any>> {
    return this.http.get('./../assets/' + this.url).pipe(
      map(res => {
        return this.d3
          .hierarchy(res)
          .sum((d: HierarchyPointNode<any>) => ( d as any).size)
          .sort((a, b) => ( b as any).value - ( a as any).value);
      })
    );
  }
}
