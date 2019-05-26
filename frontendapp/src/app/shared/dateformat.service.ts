import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Dateformat {
	
  constructor() {
  };
  momentFormat="YYYY-MM-DD";
  format(date) {
        if (date === null) {
            return '';
        }
        let d = moment({ year: date.year, 
                         month: date.month - 1, 
                         date: date.day });
        return d.isValid() ? d.format(this.momentFormat) : '';
    }

    parse(value) {
        if (!value) {
            return null;
        }
        let d = moment(value, this.momentFormat);
        return d.isValid() ? { year: d.year(), 
                               month: d.month() + 1, 
                               day: d.date() } : null;
    }
}
