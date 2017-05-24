//Sets up parameters to pass in to the updateDashNotesMethod(notes: Notes)
export class Notes {
  user: string;
  query_id: any;
  description: string;
}

export class DeleteQuery {
  user: string;
  query_id: any;
}

export class ShareQuery {
  user: string;
  query_id: number;
  share: number
}

//This class is used in filter component
// export class queryData {
//   id_Query_ID: number = 18
//   txt_Query_Name: string = "Health Care Category"
//   txt_User_Name: string = "jkellyh"
//   bool_Pct_Chg: boolean = false
//   bool_Act_Chg: boolean = false
//   bool_Include_Totals: boolean = false
//   bool_Share: boolean = false
//   id_Query_Status_ID: number = 0
//   dt_Create: string = "02/22/2017"
//   dt_Last_Edit: string = "02/22/2017"
//   dt_Last_Run: string = null
//   dt_Next_Run: string = "02/22/2017"
//   dt_Expiration: string = "03/01/2017"
//   id_Schedule_ID: string = null
//   txt_Description: string = null
//   txt_Query_Status: string = "New"
//   dt_Schedule_Report: string = "02/22/2017"
// }

//This class is used in filter component
export class item {
  public id_Header_ID: number
  public int_Count: number
  public int_Order: number
  public txt_Header_Name: string
  public txt_Object_Type_Name: string //ToDo: Remove.
  public txt_Header_Value: string[] = [] //ToDo: Look at removing.
}

//This class is posted when object is drop in filter zone.
export class newFilterPost {
  public user: string
  public query_id: number
  public header_id: number
  public order: number
  public txt_Object_Type_Name: string
  public id_Header_ID: number
  public txt_Header_Name: string
}



export class postGroupBy {
 public  user: string
 public  query_id: number
 public  header_id: number
 public  cross_tab: number
 public  order: number
}

export class postMeasure {
 public  user: string
 public  query_id: number
 public  measure_id: number
 public  order: number
}

export class Query_Filter_ID {
 public Query_Filter_ID: number
//  constructor(query_Filter_ID: number){
//    query_Filter_ID = query_Filter_ID
//  }
}




