import {Observable, map, timer} from 'rxjs'
import {Pipe, PipeTransform} from '@angular/core'

import moment from 'moment'

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        return moment(value).fromNow()
      }),
    )
  }
}
