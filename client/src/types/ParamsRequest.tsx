export type ParamsRequest={
    page?:number, //pageIndex
    results?:number|string, // results expect from request
    seed?:string, //seed for request (randomUsers)
    inc?:string,//includ fields (randomUsers)
    search?:string, //search field
    total?:number // total return request
  }