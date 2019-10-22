import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  selectedTags = new Subject<string[]>();
  goToProjects = new Subject<boolean>();
  triggerRebuild = new Subject<boolean>();

getProjects() {
    return this.http.get<{[key: string]: Project}>('../assets/projects.json')
    .pipe(
      map( res => {
        const projectsArray: Project[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            projectsArray.push({...res[key], slug: key });
          }
        }
        return projectsArray;
      })
    );
  }

getTags() {
    return this.http.get<{[key: string]: Project}>('../assets/projects.json')
    .pipe(
      map( res => {
        const projectsArray: Project[] = [];
        const tagsArray = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            projectsArray.push({...res[key], slug: key });
          }
        }
        for (const project of projectsArray) {
          for (const tag of project.tags) {
            if (!(tagsArray.indexOf(tag) > -1)) {
              tagsArray.push(tag);
            }
          }
        }
        return tagsArray;
      }
    ));
  }
}
