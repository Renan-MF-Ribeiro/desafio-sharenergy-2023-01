import { ICat } from "./Cat";

export type ICats= {
  createdAt: string;
  updatedAt: string;
  label:string,
  status:ICat[],
  _id:string
};
