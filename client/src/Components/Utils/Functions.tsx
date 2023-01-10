import { IAuthentication } from "types/Authentication";
import { ICat } from "types/Cat";
import { ICats } from "types/Cats";
import { IClient } from "types/Client";
import { IInfo } from "types/Info";
import { ParamsRequest } from "types/ParamsRequest";
import { IUser } from "types/User";
import { IUserList } from "types/UserList";

export const paramsStringify = (params?: ParamsRequest) => {
  const defaultParams = {
    page: 1,
    results: 100,
    seed: "sharenergy",
    nat: "br",
    inc: "name,email,login,picture,dob,id",
  };
  let string = JSON.stringify({ ...defaultParams, ...params });
  const paramsString = string
    .slice(1, string.length - 1)
    .replace(/:/g, "=")
    .replace(/,(?=")/g, "&")
    .replace(/["]/g, "");
  return paramsString;
};

export const CreateNewInfo = (): IInfo => {
  return {
    page: 1,
    results: 10,
    total: 0,
  };
};

export const CreateNewUser = (): IUser => {
  return {
    photo: "",
    name: "",
    email: "",
    networkLogin: "",
    birthDate: "",
    id: 0,
    _id: "",
    picture: "",
  };
};

export const CreateNewUserList = (): IUserList => {
  return {
    data: [CreateNewUser()],
    info: CreateNewInfo(),
    all: [CreateNewUser()],
  };
};

export const CreateNewClient = (): IClient => {
  return {
    name: "",
    cpf: "",
    cell: "",
    phone: "",
    email: "",
    street: "",
    number: "",
    city: "",
    state: "",
    district: "",
  };
};

export const CreateNewICat = (): ICat => {
  return {
    name: "",
    status: "",
  };
};

export const CreateNewAutheticator = (): IAuthentication => {
  return {
    tokenEncript: "",
    user: CreateNewUser(),
  };
};

export const CreateNewCatsStatus = (): ICats => {
  return {
    createdAt: "",
    updatedAt: "",
    label: "",
    status: [CreateNewICat()],
    _id: "",
  };
};

export const ValidateFormClient = (client: any): boolean => {
  let r = true;
  const exeption = ["__v", "picture"];
  const required = [
    "name",
    "cpf",
    "cell",
    "email",
    "street",
    "number",
    "city",
    "state",
    "district",
  ];
  for (const key of required) {
    if (!exeption.includes(key)) {
      if (
        !client[key] ||
        client[key] === undefined ||
        client[key] === "" ||
        client[key] === null
      ) {
        r = false;
        break;
      }
    }
  }
  return r;
};

export function stringAvatar(name?: string) {
  if (name) {
    return { children: `${name?.split(" ")[0][0]}`.toUpperCase() };
  }
}
