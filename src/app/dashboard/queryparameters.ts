//Sets up parameters to pass in to the updateDashNotesMethod(notes: Notes)
export class Notes{
  user: string;
  query_id: any;
  description: string;
}

export class DeleteQuery{
  user: string;
  query_id: any;
}

export class ShareQuery{
  user: string;
  query_id: number;
  share:number
}

export class cancelNote{
  user: string;
  query_id: any;
  description: string;
}

export class newQuery{
  user: string;
  segment_id: number;
  xpdb: string
}

export class changeQueryName{
  user: string;
  query_id: number;
  name: string
}

export class saveQuery{
  user: string;
  query_id: number;
}