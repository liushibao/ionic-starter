import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanString'
})
export class BooleanStringPipe implements PipeTransform {

  transform(value: boolean, ...args: any[]): string {
    return value ? "是" : "否";
  }

}


