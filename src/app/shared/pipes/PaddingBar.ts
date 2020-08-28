import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddingBar'
})
export class PaddingBar implements PipeTransform {

  transform(str: string, isEnding: boolean = false) {
    return isEnding ? str ? str : null : str ? str + " | " : null;
  }

}
