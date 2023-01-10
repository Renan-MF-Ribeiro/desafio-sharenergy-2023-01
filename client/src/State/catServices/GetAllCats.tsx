import {API} from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";
import { ICats } from "types/Cats";

export default async function GetAllCats(): Promise<ICats[]> {
  return new Promise(async (resolve, reject) => {
    API.get<ICats[]>("cats", {
      headers: {
        Authorization: getSession("token"),
      },
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}
