import { Injectable } from '@angular/core';
import { QueryDataService } from './query-data.service'
import { MedusaDataService } from './medusa-data.service'
import { SegmentDataService } from './segment-data.service'

export class Segment__Header {
  //constructor(
    public id_Header_ID: number
    public int_Order: number
    public txt_Header_Name: string
    public int_Header_Value_Count: number
    public txt_Object_Type_Name: string
    public id_Object_Type_ID: number
  //){}
};

export class Medusa__Measure
{
   id_Measure_ID: number
   txt_Display_Name: string
   int_Display_Order: number
   id_Measure_Group_ID: number
}

export class Medusa__Measure_Group
{
   id_Measure_Group_ID: number
   txt_Measure_Group_Name: string
   int_Order: number
}

export class Medusa__Result {
  id_Result_ID: number
  id_Query_ID: number
  id_Medusa_Query_ID: number
  dt_Create: string
  dt_Expire: string
  txt_Windows_Result_Path: string
}

export class Segment__Object_Type {
  constructor(
    public id_Object_Type_ID: number,
    public int_Display_Order: number,
    public txt_Object_Type_Name: string,
  ){}
};

export class Summary__Result{
  public txt_User_Name: string
  public id_Query_ID: number
}



export class Query__Query {
    public id_Query_ID: number
    public txt_Query_Name: string
    public txt_User_Name: string
    public bool_Measures_First: boolean
    public bool_Pct_Chg: boolean
    public bool_Act_Chg: boolean
    public bool_Include_Totals: boolean
    public bool_Share: boolean
    public id_Query_Status_ID: number
    public dt_Create: string
    public dt_Last_Edit: string
    public dt_Last_Run: string
    public dt_Next_Run: string
    public dt_Expiration: string
    public id_Schedule_ID: string
    public txt_Description: string
    public txt_Query_Status: string
    public dt_Schedule_Report: string
    public txt_Query_Status_Name: string
    public txt_Query_Status_Class_Name: string
    public id_Medusa_Query_ID: number
    public txt_Query_Status_User_Msg: string
    public txt_Query_Status_Admin_Msg: string
    public txt_Query_Summary: string
    public bool_All_Transactions: boolean
    public bool_Card_Only: boolean
    public bool_Non_Card_Only: boolean
    public bool_Exclude_Supplies: boolean
    public bool_Exclude_Exception_HHs: boolean

    public resultA: Medusa__Result[]
    //public isExpanded: boolean
    // public resultB: Query__Summary[];
}

export class Query__Group_By {
  public id_Group_By_ID:number
  public id_Query_ID:number
  public id_Object_Type_ID: number;
  public txt_Object_Type_Name: string;
  public id_Header_ID: number
  public txt_Header_Name: string
  public bool_Cross_Tab: boolean
  public int_Order: number
}

export class Query__Filter {
  id_Query_Filter_ID: number
  id_Object_Type_ID: number
  txt_Object_Type_Name: string
  id_Header_ID: number
  txt_Header_Name: string
  int_Order: number
}

export class Query__Filter_Value {
  id_Query_Filter_ID: number
  id_Header_Value_ID: number
  txt_Header_Value: string
}

export class Query__Header_Count {
  id_Header_ID: number
  int_Order: number
  txt_Header_Name: string
  int_Header_Value_Count: number
  txt_Object_Type_Name: string
  id_Object_Type_ID: number
}

export class Query__App_Settings
{
   int_Max_Header_Values: number
   int_Max_Result_Num_Records: number
   int_Max_Data_Table_Rows: number
   int_Max_Data_Table_Columns: number
}

@Injectable()
export class CetoDataService {

  constructor(
    public query: QueryDataService,
    public medusa: MedusaDataService,
    public segment: SegmentDataService
  ) { }

}
