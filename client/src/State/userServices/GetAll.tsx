import { IUser } from "types/User";
import { ParamsRequest } from "types/ParamsRequest";
import { paramsStringify } from "Components/Utils/Functions";
import { IUserList } from "types/UserList";
import { IInfo } from "types/Info";
import { handleChangePage } from "./HandlerList";

export default async function GetAll(
  params?: ParamsRequest
): Promise<IUserList> {
  return new Promise(async (resolve, reject) => {
    const users: IUser[] = [];
    await fetch("https://randomuser.me/api/?" + paramsStringify(params))
      .then((response) => response.json())
      .then((result) => {
        const info:IInfo = {
          page: result.info.page,
          results: 5,
          total: result.results.length
        };
        const data = result.results;
        data.forEach((element: any) => {
          const user: IUser = {
            name: `${element.name.first} ${element.name.last}`,
            email: element.email,
            id: element.id.value,
            birthDate: element.dob.date,
            photo: element.picture.large,
            networkLogin: element.login.username,
          };
          users.push(user);
        });
        resolve( handleChangePage({ data: [], info,all:users }));
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
