import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
