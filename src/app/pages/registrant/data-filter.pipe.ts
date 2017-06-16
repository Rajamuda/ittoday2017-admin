import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
    	// console.log()
    	var filterKeys = _.keys(array[0]);
      var chk = 0;

      if(array[0].user){
        filterKeys = _.keys(array[0].user);
        chk = 1;
      }

    	if(filterKeys.indexOf('nama_team') != -1){
     	 	return _.filter(array, row=>row[filterKeys[1]].indexOf(query) > -1);
    	}

      if(chk == 1){
        return _.filter(array, row=>row.user[filterKeys[0]].indexOf(query) > -1);
      }

      return _.filter(array, row=>row[filterKeys[0]].indexOf(query) > -1);
    }
    return array;
  }
}