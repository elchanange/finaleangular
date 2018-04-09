import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'beforeNow'
})
export class BeforeNowPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.timeSince(new Date(value));
  }

  timeSince(date) {
    const seconds = Math.floor((new Date().getTime() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes';
    }
    return 'Now';
  }

}
