import {API} from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";
import { IUser } from "types/User";

export default function RegisterUser(
  client: IUser
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    API.post("users/", client)
      .then((resp) => resolve(resp.data))
      .catch((err) => {
        reject(err.response.data)
      });
  });
}
