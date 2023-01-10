import { API } from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";
import { IClient } from "types/Client";
import { ParamsRequest } from "types/ParamsRequest";

export default function GetClients(
  options: ParamsRequest
): Promise<{ data: IClient[]; total: number }> {
  return new Promise(async (resolve, reject) => {
    API.get<{ data: IClient[]; total: number }>("clients", {
      params: options,
      withCredentials: true,
      headers: { Authorization: getSession("token") },
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}
