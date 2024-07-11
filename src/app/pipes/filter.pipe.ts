import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  public transform<T>(array: T[], prop: string, value: string): T[] {
    if (value === '' || value === undefined || value === null) return array;
    return array?.filter((x:any) =>
        x[prop]
            .toLowerCase()
            .includes(value.toLowerCase())
    );
  }

}
