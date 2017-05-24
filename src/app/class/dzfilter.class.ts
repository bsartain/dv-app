export class Dzfilter_request {
    user: string;
    query_id: number;
    header_id: number;
    order: number;
    txt_Object_Type_Name: string

    // constructor(user: string, query_id: number, header_id: number, order: number, txt_Object_Type_Name){
    //     this.user = user;
    //     this.query_id = query_id;
    //     this.header_id = header_id;
    //     this.order = order;
    //     this.txt_Object_Type_Name;
    // }
}

export class Dzfilter_response {
    id_Query_Filters_ID: number
    id_Object_Type_ID: number
    id_Header_id: number
    txt_Header_Name: string
    int_Order: number 

    // constructor(id_Query_Filters_ID: number,
    //     id_Object_Type_ID: number,
    //     id_Header_ID: number,
    //     txt_Header_Name: string,
    //     int_Order: number)
    // {
    //     id_Query_Filters_ID = id_Query_Filters_ID;
    //     id_Object_Type_ID = id_Object_Type_ID;
    //     id_Header_ID = id_Header_ID;
    //     txt_Header_Name = txt_Header_Name
    //     int_Order = int_Order;
    // }
}

export class DzHaederValue_post {
  public  user: string
  public  query_filter_id: number
  public  header_value_id: number
}