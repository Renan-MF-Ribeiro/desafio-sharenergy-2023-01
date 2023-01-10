import { API } from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";
import { IUser } from "types/User";

export default function UpdateUser(id: string, client: IUser): Promise<any> {
  delete client.remember
  return new Promise(async (resolve, reject) => {
    API.put("users/auth/" + id, client, {
      headers: { Authorization: getSession("token") },
    })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });
}
