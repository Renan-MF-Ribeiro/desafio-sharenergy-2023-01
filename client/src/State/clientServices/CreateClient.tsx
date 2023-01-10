import {API} from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";
import { IClient } from "types/Client";

export default function CreateClient(
  client: IClient
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    API.post("clients/", client,{
        headers: { Authorization: getSession("token") },
    })
      .then((resp) => resolve(resp.data))
      .catch((err) => {
        reject(err.response.data)
      });
  });
}
