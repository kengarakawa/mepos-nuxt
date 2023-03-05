export type DataTableColumnOptions = {
    cellType: string; 
    label?: string;  
    displayField: string = 'id';
    sortable?:boolean = false;
    cellClass?: Object = {};    
    filter?: boolean=false;
    format?: Object = {} ;
    noSearch?:boolean= true ;
    checkbox?:boolean=false  ;  
  }
  