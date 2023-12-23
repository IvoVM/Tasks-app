// time-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      return 'data inexistente';
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
