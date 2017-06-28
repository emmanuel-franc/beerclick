import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLocale'
})
export class ToLocalePipe implements PipeTransform {

  transform(value: number): any {
    return value.toLocaleString('fr-FR');
  }
}
