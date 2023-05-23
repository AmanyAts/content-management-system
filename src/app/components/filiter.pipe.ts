import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filiter'
})
export class FiliterPipe implements PipeTransform {

  transform(value: any, input: any): any {

    if (input) {


      return value.filter((val: any) => val.name.toLowerCase().indexOf(input.toLowerCase()) >= 0);

    } else {

      return value;

    }

  }

}
