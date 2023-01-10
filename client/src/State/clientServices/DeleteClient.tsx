import { API } from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";

export default function DeleteClient(id: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    API.delete("clients/" + id, {
      headers: { Authorization: getSession("token") },
    })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });
}
