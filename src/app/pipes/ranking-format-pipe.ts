import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankingFormat'
})
export class RankingFormatPipe implements PipeTransform {

  transform(el : any): String {
    return el.name + "-" + el.points;
  }

}
