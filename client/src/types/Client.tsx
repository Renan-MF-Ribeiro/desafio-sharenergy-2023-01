export type IClient = {
  picture?: string;
    //informações pessoais
  name: string;
  cpf: string;
  //contato
  cell: string;
  phone: string;
  email: string;
  //endereço
  street: string;
  number: string;
  city: string;
  state: string;
  district: string;
  //auto
  _id?:string;
  createdAt?: string;
};
