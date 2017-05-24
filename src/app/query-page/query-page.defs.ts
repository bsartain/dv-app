
export class HeaderDrop {
  public id_Header_ID: number;
  public txt_Header_Name: string;
  public id_Object_Type_ID: number;
  public txt_Object_Type_Name: string
}

// Container to track data with an orderd array and a hash
export class Container <T> {
  private _hash: { [id: number] : T } = {};
  private _array: T[] = [];
  private _arrayPosH: { [id: number] : number } = {};
  private _idName: string;

  constructor(idName: string) {
    this._idName = idName;
  }

  public empty () {
    this.clear();
  }
  
  public clear() {
    this._hash = {};
    this._array = [];
    this._arrayPosH = [];
  }

  public set(a:T[]){
    this._array = a;
    this._hash = {};
    let pos:number = 0;
    a.forEach(x => {
      this._hash[x[this._idName]] = x;
      this._arrayPosH[x[this._idName]] = pos;
      pos = pos + 1;
    })
  }

  public push (x: T) {
    //console.log("push: " + x[this._idName])
    //console.log(this._idName)
    if (this._hash[x[this._idName]] == null) {
      this._hash[x[this._idName]] = x;
      this._arrayPosH[x[this._idName]] = this._array.length;
      this._array.push(x);
    }
  }

  public remove (id: number) : T {
    for(var i = 0, len = this._array.length; i < len; i++) {
      //console.log("remove: check: " + this._array[i][this._idName] )
      if (this._array[i][this._idName] == id) {
        let x: T[] = this._array.splice(i, 1);
        delete this._hash[id];
        delete this._arrayPosH[id];
        return x[0];
      }
    }
  }

  public replace(x:T) {
    let c:T = this._hash[x[this._idName]];
    if (c != null){
      let id:number = c[this._idName];
      let pos:number = this._arrayPosH[id];
      this._hash[id] = x;
      this._array[pos] = x;
    }
  }

  public find (id:number) : T {
    return this._hash[id];
  }

  public array (): T[] {
    return this._array;
  }
}

