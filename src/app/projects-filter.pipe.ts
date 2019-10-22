import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "projectsFilter"
})
export class ProjectsFilterPipe implements PipeTransform {
  transform(value: any, filterTags: string[], tagsArray: string): any {
    if (value.length === 0) {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      for (const tag of filterTags) {
        if (
          resultArray.indexOf(item) <= -1 &&
          item[tagsArray].indexOf(tag) > -1
        ) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }
}
