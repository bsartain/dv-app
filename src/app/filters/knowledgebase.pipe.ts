import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'knowledgebase'
})
export class KnowledgebasePipe implements PipeTransform {

  transform(value: any[], filter: string): any[] { 

      filter = filter ? filter.toLocaleLowerCase() : '';

      return filter && value ?

        value.filter(kb =>
           (kb.title !== null ? kb.title.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
           (kb.definition !== null ? kb.definition.toLocaleLowerCase().indexOf(filter) !== -1 : false) 
        ) :
        
        value;

   }

}
